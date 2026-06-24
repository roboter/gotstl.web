How to Run
Run preview updates for all examples
bash
```
npm run generate-previews -- --force --static
```
This will automatically serve the built client locally, launch Puppeteer, and regenerate high-resolution, perfectly zoomed-in `.png` assets under `src/assets/examples/` for `example001.jscad` through `example005.jscad`.

### Options Reference

- `--all`: Force regenerate screenshots for all `.jscad` files.
- `--force`: Overwrite existing screenshot PNGs.
- `--static`: Force rendering using the built static files under `dist/gotstl` rather than checking `localhost:4200`.
- `--verbose`: Print verbose browser console outputs and network request logs.
- `[file1.jscad file2.jscad ...]` : Pass specific example files to only process those models.

### Example:

```bash

npm run generate-previews -- example001.jscad --force --static
```