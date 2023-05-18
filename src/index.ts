import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const labels = github.context.payload!.pull_request!.labels!;
    const required_labels: string[] = (core.getInput('required_labels', {required: true}) !== '') ? (core.getInput('required_labels', {required: false})).split(',') : [];

    if (required_labels.length > 0 &&
          !required_labels.some(requiredLabel => labels.find((l: any) => l.name === requiredLabel)) ) {
      core.setFailed(`Please set at least one of the following labels on the PR: ${required_labels}`);
    }
  }
  catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
