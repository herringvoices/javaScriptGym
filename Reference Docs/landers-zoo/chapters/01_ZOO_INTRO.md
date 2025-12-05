# Lander's City Zoo

Miranda Lander has always loved animals. Her parents spent much of her childhood visiting wildlife sanctuaries, volunteering at rescue centers, and going on thrilling safari adventures around the world.

When she turned 25, she knew what she wanted to do with the rest of her life - share her love of animals with her community. She decided to start her very own zoo called **_Lander's City Zoo_**. As her zoo grew, she started adding more habitats, and her staff quickly expanded.

Miranda knew it was time to start managing her zoo with software. She has hired you as her first software developer after trying to do it herself, and quickly realizing that coding was definitely NOT her superpower.

You'll pretty quickly spot some of her lil mistakes in the code, but fair warning: some bugs are sneakier than the chameleons in Lander's reptile room. Time to put on your detective hat and hunt down these mysteries!

## Getting Started

1. Run the setup script to create your project files:
   ```bash
   /bin/bash -c "$(curl -fsSL http://gitlab.djrc.perseverenow.org/nhomoelle/landers-zoo/-/raw/main/scripts/setup.sh)"
   ```
2. Open the project in VS Code.
3. Open `index.html` with Live Server.
4. Open the browser console to see output and any errors.
5. Edit `zoo.js` in VS Code, save, and refresh the browser to re-run.

## Initial Output

Fire up the browser console and you'll see something like this (brace yourself for the error):

```sh
	L A N D E R ' S   Z O O
	***********************************************************

***************************************************
*****              H A B I T A T S            *****
***************************************************
We maintain 2000 square meters of animal habitats across the zoo
Process exited with error: ReferenceError: smallestHabitat is not defined
```

Yikes! 😬

## What Miranda Needs You To Fix

1. The zoo actually has 11,500 square meters of habitats total, but the code is showing 2000. Something's fishy (apart from the fish).
2. The smallest habitat is 800 square meters, but the code crashes before it can tell anyone.
3. The largest habitat is 4000 square meters. Miranda _thinks_ she wrote that code correctly, but since the app explodes before it gets there, who knows?

## Navigation

[Next ➜ Chapter 2: Animals](./02_ZOO_ANIMALS.md) | [Home](../README.md)

