---
titre: "Content audit: checking every question before learners see it"
fait: "In the first course audited, 1 question in 20 stopped learners from answering. All of them were fixed."
synthese:
  probleme: "Feedback from learners on an EdTech platform showed that their satisfaction depends first on the quality of the content."
  action: "With a learning designer, we ran every question in one course through a six-criterion grid, applied by supervised AI agents and backed up by automated checks."
  resultat: "In that first course, 1 question in 20 stopped learners from answering, and all of them were fixed after human review."
plusLoin:
  - "The grid"
  - "Each question is read against six criteria."
  - "Faithfulness to the source. The question stays true to its source."
  - "Correct key. The expected answer is the right one."
  - "Quality of the explanation. It is scored from 0 to 3."
  - "Language."
  - "Internal consistency. The parts of the question do not contradict each other."
  - "Single answer. The key is the only defensible answer."
  - "The verdict runs from blocking to nothing to fix, through major and minor. A question is blocking if its key is wrong, or if another answer can be defended just as well. It is major if it strays from its source, or if its explanation does not help learners. It is minor for a language error, or for an explanation that is correct but could be better. A criterion counts as failed only if it was checked: what could not be measured does not count against the question."
  - "The automated checks cover the whole corpus. They apply verifiable rules, with no model judgment. For example, does the explanation refer to the same audio as the question, is the content formatting intact, is the text in the right language?"
  - "What the feedback said"
  - "Nearly one NPS comment in five concerns the quality of explanations, exercises or translations."
  - "The doctrine, and what it cost"
  - "The 25 rules are measured on this project: about 30 million tokens over four weeks, and 233 decision points logged in a register."
  - "Start version control with the first file. Two weeks of work had gone untracked."
  - "Cap module size. The three largest modules, between 5,400 and 7,600 lines, were also the most rewritten."
  - "Read field names from the data instead of guessing them."
  - "A rule that can be checked becomes a test."
  - "The reviewer is not the author."
  - "Every workstream is costed before it starts and after it ends."
langue: en
cle: auditContenu
---

## Why audit

The first project in this portfolio, UserVoice, gathered what learners on an EdTech platform say about it. In the site's feedback form, 1 in 3 pieces of feedback is about the content. That is where satisfaction is decided first.

We put the effort into the content itself, question by question. I led this work with a learning designer. She validated the audit grid, set the writing rules for the content (line breaks, editorial rules) and ran acceptance testing on the samples.

The scope covers six courses that prepare learners for language certifications. We started with the oldest one.

## The method

Each question goes through a six-criterion grid, which I designed and the learning designer validated. Two criteria concern the expected answer, the key: is it correct, and is it the only defensible one? The other four check faithfulness to the source, the quality of the explanation, the language, and the internal consistency of the question.

The grid ends in one of four verdicts: blocking, major, minor, or nothing to fix. A question is blocking when learners cannot answer it, for example because the key is wrong or because two answers can be defended equally well.

I built the tooling that applies the grid. AI agents, in this case Claude Code subagents, work through it question by question, on a subscription and without calls to a paid API. The model does not judge alone. Automated checks also sweep the whole corpus, with verifiable rules that do not depend on any model. A report then gives each question's status and the issues raised against it.

## What we found

In the first course audited, 1 question in 20 was rated blocking. Each of them made learners fail through no fault of their own.

Fixing them therefore has a direct effect for learners. Each blocking question we rework makes a correct answer possible again.

This course is the oldest of the six. Its result does not predict the quality of the other five.

## Fixing without breaking

The fixes we keep come out in batches ready for review, headed for the staging environment. The tool never writes directly to the database: it only produces the batches. A person reviews each batch before anything is applied.

That choice leaves the decision with a person. An agent that gets a key wrong produces, at worst, a batch that is rejected at review. Nothing it proposes goes live unread.

All the blocking questions in the first course have been fixed. The fixes went into production the week of September 28, 2026.

## What I took from it

This project gave me a doctrine of 25 rules for running a project with AI. I measured it on the project itself, in tokens used over four weeks and in decision points logged in a register.

Some rules fit in one line and were expensive to learn before they were written down. Starting version control with the very first file is one of them, learned after two weeks of work went untracked.

The rule “the reviewer is not the author” sums up the audit. It applies to the fixes an agent proposes as much as to the code I write with it.
