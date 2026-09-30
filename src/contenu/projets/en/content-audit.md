---
titre: "Content audit: checking every question before learners see it"
date: "2026-09"
fait: "In the first course audited, 1 question in 20 stopped learners from answering. All of them were fixed."
synthese:
  probleme: "According to their feedback, the satisfaction of learners on an EdTech platform depends first on the quality of the content."
  action: "With a learning designer, we put every question in one course through a six-criterion grid. Supervised AI agents applied it, and automated checks completed it."
  resultat: "The fixes, reviewed by sample before being applied, have been in production since the week of September 28, 2026."
plusLoin:
  - titre: "The grid"
    points:
      - "Faithfulness to the source. The question does not stray from its source."
      - "Correct answer. The expected answer is the right one."
      - "Quality of the explanation. The question includes one, and it does more than repeat the answer. It is scored from 0 to 3."
      - "Language. The text is correct."
      - "Internal consistency. The parts of the question do not contradict each other."
      - "One defensible answer. No other answer can be defended as well as the correct one."
  - titre: "The verdicts"
    points:
      - "A question is major if it strays from its source, or if its explanation does not help learners."
      - "It is minor for a language error, or for an explanation that is correct but could be better."
      - "A criterion counts as failed only if it was checked. What could not be measured does not count against the question."
  - titre: "The automated checks"
    points:
      - "The audio, read through its transcript, says what the question claims it says."
      - "The text and image materials contradict neither the question nor the audio."
      - "The question is about what the audio and the materials say."
      - "The answer options match the question asked."
      - "The explanation refers to the same audio, the same materials and the same answers as the question."
  - titre: "The rules, and what they cost"
    points:
      - "Four weeks of work, and 233 decision points logged in a register."
      - "Cap module size. The largest modules were also the most rewritten."
      - "Read field names from the data instead of guessing them."
langue: en
cle: auditContenu
---

## Why audit

In the site’s feedback form, 1 in 3 pieces of feedback is about the content: that is what the first project, UserVoice, found.

I led this work with a learning designer. I designed the audit grid and the tooling that applies it; she validated the grid and set the writing rules for the content.

The scope covers several courses that prepare learners for language certifications. We started with the oldest one.

## What the grid checks

The grid has six criteria, detailed under “Going further”: faithfulness to the source, correct answer, quality of the explanation, language, internal consistency, and one defensible answer.

Each question then gets one of four verdicts: blocking, major, minor, or nothing to fix. A question is blocking when learners cannot answer it. That happens when the expected answer is wrong, or when two answers can be defended equally well.

Supervised AI agents apply the grid, question by question. The model does not judge alone. In parallel, automated checks run over the whole corpus: a deterministic check, then an AI check. They verify that the audio, through its transcript, the text and image materials, the question, the answers and the explanation are consistent. A report then gives each question’s status and the issues raised against it.

<div data-schema="chaine-audit"></div>

## What we found

In the first course audited, 1 question in 20 was rated blocking. Learners failed these questions through no fault of their own.

This result does not predict the quality of the rest of the content on the site.

## Fixing without breaking

The tool never writes directly to the database. It produces batches of fixes, grouped by family of defects. The learning designer reviews, family by family, the least reliable cases, and her decision covers the whole family. When an agent gets one of these cases wrong, no fix in that family goes through as it is.

On the first course, she also checked the fixes in staging. All the blocking questions were fixed, then put into production.

<figure>
  <a href="/captures/audit-contenu/carnet-relecture.png"><img src="/captures/audit-contenu/carnet-relecture.png" width="1360" height="1230" loading="lazy" decoding="async" alt="Review screen from an audit tool. A card marked BLOQUANT (blocking) shows a fill-in-the-blank English question, “She has been working in this department ___ 2019”, whose stored answer is A, “for”. The current explanation only asserts that A is correct. The check flags that the right answer is B. The proposed correction explains that “since” introduces a starting point. At the bottom, the decision line: approve, correct, reject."></a>
  <figcaption>The review log: for each case reviewed, the issue raised, the proposed correction and the decision. Synthetic data.</figcaption>
</figure>

## Benefits and business impact

Each fix gives learners back the chance to answer correctly. At the annual review, a B2B client, a school, asked for three things: a full analysis of its content, a formal process for fixing errors, and an end to multiple-choice questions where more than one answer can be defended. Cross-checked with feedback from B2B2C learners, its reports pointed to the same pain point. The audit answers each request in turn: the grid for the full analysis, the reviewed batches for the process, the “one defensible answer” criterion for the disputed questions. It is a direct way to reduce the risk of churn for this client, and the same method applies to the next courses.

## What I took from it

This project is teaching me to vibe code efficiently, and I am still on the way. A few practices already hold.

Every workstream is costed before it starts, then again once it ends. The gap shows where the estimate was wrong. A rule that can be checked becomes a test. From then on it is enforced automatically, without relying on anyone’s memory.

The rule “the reviewer is not the author” sums up the audit. What one agent produces, another agent reviews, and a person decides. This rule applies to content fixes as much as to the code I write with AI.

Some rules were expensive before they were written down. Without version control from the first file, two weeks of work went untracked.
