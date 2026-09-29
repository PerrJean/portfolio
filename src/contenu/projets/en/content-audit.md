---
titre: "Content audit: checking every question before learners see it"
date: "2026-09"
fait: "In the first course audited, 1 question in 20 stopped learners from answering. All of them were fixed."
synthese:
  probleme: "According to their feedback, the satisfaction of learners on an EdTech platform depends first on the quality of the content."
  action: "With a learning designer, we put every question in one course through a six-criterion grid. Supervised AI agents applied it, and automated checks completed it."
  resultat: "The fixes, reviewed before being applied, have been in production since the week of September 28, 2026."
plusLoin:
  - "The grid"
  - "Each question is read against six criteria."
  - "Faithfulness to the source. The question does not stray from its source."
  - "Correct answer. The expected answer is the right one."
  - "Quality of the explanation. The question includes one, and it does more than repeat the answer. It is scored from 0 to 3."
  - "Language. The text is correct."
  - "Internal consistency. The parts of the question do not contradict each other."
  - "One defensible answer. No other answer can be defended as well as the correct one."
  - "The verdict runs from blocking to nothing to fix, through major and minor. A question is blocking if its expected answer is wrong, or if another answer can be defended just as well. It is major if it strays from its source, or if its explanation does not help learners. It is minor for a language error, or for an explanation that is correct but could be better. A criterion counts as failed only if it was checked. What could not be measured does not count against the question."
  - "The automated checks cover the whole corpus. They apply verifiable rules, with no model judgment. The explanation must refer to the same audio as the question. The content formatting must stay intact. The text must be in the right language."
  - "What the feedback said"
  - "Nearly one NPS comment in five concerns the quality of explanations, exercises or translations."
  - "The rules, and what they cost"
  - "The 25 rules are measured on this project: about 30 million tokens over four weeks, and 233 decision points logged in a register."
  - "Start version control with the first file."
  - "Cap module size. The three largest modules, between 5,400 and 7,600 lines, were also the most rewritten."
  - "Read field names from the data instead of guessing them."
  - "A rule that can be checked becomes a test."
  - "The reviewer is not the author."
  - "Every workstream is costed before it starts and after it ends."
langue: en
cle: auditContenu
---

## Why audit

In the site's feedback form, 1 in 3 pieces of feedback is about the content: that is what the first project, UserVoice, found.

We put the effort into the content itself, question by question. I led this work with a learning designer. I designed the audit grid and the tooling that applies it. The learning designer validated the grid. She also set the writing rules for the content (line breaks, editorial rules) and ran acceptance testing on the samples.

The scope covers six courses that prepare learners for language certifications. We started with the oldest one.

## What the grid checks

The grid has six criteria. Two concern the answer: the expected answer is the right one, and no other answer is as defensible. A third checks that the question includes an explanation, and that it is not circular. The last three cover faithfulness to the source, language and internal consistency.

Each question then gets one of four verdicts: blocking, major, minor, or nothing to fix. A question is blocking when learners cannot answer it. That happens when the expected answer is wrong, or when two answers can be defended equally well.

AI agents apply the grid, question by question. They are Claude Code subagents, running on a subscription with no calls to a paid API. The model does not judge alone. Automated checks also run over the whole corpus, with verifiable rules that do not depend on any model. One of them, for example, checks that the explanation refers to the same audio as the question. A report then gives each question's status and the issues raised against it.

<div data-schema="chaine-audit"></div>

## What we found

In the first course audited, 1 question in 20 was rated blocking. Learners failed these questions through no fault of their own. Each fix gives them back the chance to answer correctly.

This course is the oldest one. Its result does not predict the quality of the rest of the content on the site.

## Fixing without breaking

The tool never writes directly to the database. It produces batches of fixes, and a person reviews each one before staging. If an agent gets an answer wrong, the worst case is a batch rejected at review.

All the blocking questions in the first course have been fixed. The fixes went into production the week of September 28, 2026.

## What I took from it

This project gave me 25 rules for running a project with AI. They are there to keep control over what an agent produces. I measured them on the project itself, in tokens used over four weeks and in decision points logged in a register.

They change how the work gets done. Every workstream is costed before it starts, then again once it ends. The gap shows where the estimate was wrong. A rule that can be checked becomes a test. From then on it is enforced automatically, without relying on anyone's memory.

The rule “the reviewer is not the author” sums up the audit. What one agent produces, another agent reviews, and a person decides. This rule applies to content fixes as much as to the code I write with AI.

Some rules were expensive before they were written down. Without version control from the first file, two weeks of work went untracked.
