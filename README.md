# Simulation runner

Runs simulation batches for a small game project on GitHub Actions' free runners. Holds the simulation engine
(`fastsim/`), the current game build and the runner workflow; both are overwritten from the main project on every
batch, so nobody edits this repo by hand.

- A batch is a push to a `batch/<id>` branch with `sims/jobs.json`; each job runs on its own 4-core runner (up to 10
  at once). Results land on the `results` branch under `results/<id>/` (each job's `log.txt`, its `out` paths and
  `DONE.json`), and the batch branch is deleted.

`sims/jobs.json`:
```json
{"jobs": [
  {"id": "lab-a", "timeout": 60,
   "cmd": "cd fastsim/smartbot-vm && node balance-lab.js --engine vm --build ../../sims/builds/x.html --runs 200 --workers 4",
   "out": ["fastsim/smartbot-vm/out"]}
]}
```
`cmd` runs from the repo root with `SB_ENGINE=vm`; `timeout` is minutes (max ~330); `out` lists paths to keep.
