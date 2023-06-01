# Enforce Labels

A Github action to enforce labeling a pull request with specified labels.

## Inputs
- **required_labels:** A list of labels that at least one is required on the pull request.

## Outputs
Currently there are no outputs defined for this workflow.

## Secrets
This action does not use any secrets.

## Usage
Learn more about GitHub Actions in general [here](https://docs.github.com/en/actions/quickstart).

To use this action in your repo, follow these steps:

 1. Create a YAML file in the `.github/workflows/` directory of your repo.
 2. Copy the following into the YAML file:
```yaml
---
name: Enforce Labeling
on:
  pull_request_target:
    types: [opened, synchronize, reopened, labeled, unlabeled]
    branches:
      - main
  workflow_dispatch:

jobs:
  check_labels:
    runs-on: ubuntu-latest
    steps:
      - name: Check Pull Request Labels
        uses: discoverygarden/enforce-label@main
        with:
          required_labels: major,minor,patch,no-update
```
The labels provided in this case are our typical semantic version tagging labels, as well as a `no-update` label that will not initiate the semantic tagging workflow, in the rare case we don't want to initiate the workoflow.

The `types` on the `pull_request_target` are the base conditions `[opened, synchronize, reopened]` as well as two scenarios `[labeled, unlabeled]` which we want to track as we're specifically dealing with labels.
