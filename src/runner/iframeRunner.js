const runnerSource = String.raw`
const HOST_SOURCE = "playground-host";
const SANDBOX_SOURCE = "sandbox-runner";

const deepEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
};

const formatValue = (value) => {
  try {
    return typeof value === "string" ? '"' + value + '"' : JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
};

const createExpect = () => {
  const expect = (received) => ({
    toEqual(expected) {
      if (!deepEqual(received, expected)) {
        throw new Error(
          'Expected ' + formatValue(received) + ' to equal ' + formatValue(expected)
        );
      }
    },
    toBe(expected) {
      if (received !== expected) {
        throw new Error(
          'Expected ' + formatValue(received) + ' to be ' + formatValue(expected)
        );
      }
    },
    toBeTruthy() {
      if (!received) {
        throw new Error('Expected value to be truthy.');
      }
    },
    toContain(expected) {
      if (!received || typeof received.includes !== "function" || !received.includes(expected)) {
        throw new Error(
          'Expected ' + formatValue(received) + ' to contain ' + formatValue(expected)
        );
      }
    },
  });

  return expect;
};

const ctx = {
  $(selector) {
    return document.querySelector(selector);
  },
  text(selector) {
    const element = this.$(selector);
    const content = element && typeof element.textContent === "string" ? element.textContent : "";
    return content.trim();
  },
  waitFor(predicate, timeout = 1500, interval = 50) {
    const predicateFn = typeof predicate === "function" ? predicate : () => Boolean(ctx.$(predicate));
    const startedAt = Date.now();

    return new Promise((resolve, reject) => {
      const check = async () => {
        try {
          const result = await predicateFn();
          if (result) {
            resolve(result);
            return;
          }
        } catch (error) {
          reject(error);
          return;
        }

        if (Date.now() - startedAt >= timeout) {
          reject(new Error("Timed out waiting for condition"));
          return;
        }

        setTimeout(check, interval);
      };

      check();
    });
  },
};

const serializeError = (error) => {
  const message = error && error.message != null ? error.message : String(error);
  const stack = error && error.stack ? error.stack : "";
  return { message, stack };
};

const runAssertTest = async (test) => {
  const expect = createExpect();
  const fn = new Function(
    "expect",
    "ctx",
    "return (async () => {\\n" + test.code + "\\n})();"
  );

  await fn(expect, ctx);
};

const runTests = async ({ tests = [], entry }) => {
  const results = [];

  if (entry && /\\\.(js|jsx|ts|tsx)$/.test(entry)) {
    try {
      await import(entry + "?invalidate=" + Date.now());
    } catch (error) {
      console.error("Failed to preload entry", error);
    }
  }

  for (const test of tests) {
    try {
      await runAssertTest(test);
      results.push({ id: test.id, description: test.description, status: "passed" });
    } catch (error) {
      results.push({
        id: test.id,
        description: test.description,
        status: "failed",
        error: serializeError(error),
      });
    }
  }

  return { results };
};

const runCompletion = async ({ completion }) => {
  if (!completion) {
    // Indicate absence of automated completion without marking as failure.
    return {
      passed: null,
      message: null,
    };
  }

  const fn = new Function(
    "ctx",
    "return (async () => {\\n" + (completion.code || "return { passed: false }") + "\\n})();"
  );

  try {
    const result = await fn(ctx);
    if (result && typeof result === "object") {
      return {
        passed: Boolean(result.passed),
        message:
          result.message != null
            ? result.message
            : result.passed
            ? "Looks good!"
            : "Check the acceptance criteria.",
      };
    }

    return {
      passed: Boolean(result),
      message: result ? "Looks good!" : "Check the acceptance criteria.",
    };
  } catch (error) {
    return {
      passed: false,
      message: serializeError(error).message,
      error: serializeError(error),
    };
  }
};

window.addEventListener("message", async (event) => {
  if (!event.data || event.data.source !== HOST_SOURCE) return;

  const { type, payload } = event.data;

  try {
    if (type === "RUN_TESTS") {
      const response = await runTests(payload);
      window.parent.postMessage({ source: SANDBOX_SOURCE, type: "TEST_RESULTS", payload: response }, "*");
    }

    if (type === "CHECK_COMPLETE") {
      const response = await runCompletion(payload);
      window.parent.postMessage({ source: SANDBOX_SOURCE, type: "COMPLETE_RESULT", payload: response }, "*");
    }
  } catch (error) {
    window.parent.postMessage(
      {
        source: SANDBOX_SOURCE,
        type: "RUNNER_ERROR",
        payload: serializeError(error),
      },
      "*"
    );
  }
});
`;

export default runnerSource;
