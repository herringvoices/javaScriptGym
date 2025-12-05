# Lander's City Zoo – Overview

Small JavaScript project to practice debugging and iteration by producing console output about habitats and animals.

## Quick Start

1. Run the setup script to create your project files:
   ```bash
   /bin/bash -c "$(curl -fsSL http://gitlab.djrc.perseverenow.org/nhomoelle/landers-zoo/-/raw/main/scripts/setup.sh)"
   ```
2. Open the project in VS Code.
3. Use Live Server to open `index.html` in a browser.
4. Open the browser console to view output and errors.
5. Edit `zoo.js`, save, refresh the page to re-run.

## Data

Arrays:

* `habitats`: `id`, `name`, `climate`, `size`, `highlightAnimalId`
* `animals`: `id`, `name`, `species`, `age`, `diet`, `notableTrait`, `habitatId`

Thresholds:

* Young: age ≤ 5
* Old: age ≥ 10
* Small: size ≤ 1500
* Large: size ≥ 3000

## Chapters

1. [Habitat Totals & Initial Bugs](./chapters/01_ZOO_INTRO.md)
2. [Animal Totals & Age Extremes](./chapters/02_ZOO_ANIMALS.md)
3. [Youngest / Oldest Animal Groups](./chapters/03_ZOO_ANIMAL_AGE_RANGES.md)
4. [Smallest / Largest Habitat Groups](./chapters/04_ZOO_HABITAT_SIZE_RANGES.md)
5. [Detail Lines for Habitats & Animals](./chapters/05_ZOO_DETAILS.md)
6. [Code Organization](./chapters/06_ZOO_CLEANUP.md)
7. [Dependency & Sequence Diagrams](./chapters/07_ZOO_DIAGRAM.md)

## Progress Path

1. Fix habitat stat bugs.
2. Add animal stats.
3. Add age group listings.
4. Add size group listings.
5. Add detail sections.
6. Organize code into clear sections.
7. Draw diagrams.

## Diagrams

Add Mermaid diagrams in the diagrams chapter.
