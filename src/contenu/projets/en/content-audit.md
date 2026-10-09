---
titre: "Content audit: checking every question before learners see it"
date: "2026-09"
cadre:
  role: "Designed and built the tool, with AI"
  equipe: "With a learning designer"
  duree: "September 2026, ongoing"
fait: "In the first course audited, 1 question in 20 made learners fail through no fault of their own. All of them are fixed."
synthese:
  probleme: "Learner feedback on an EdTech platform shows that satisfaction depends first on content quality."
  action: "With a learning designer, we put every question in one course through a six-criterion grid. An AI applied the grid question by question, and automated checks completed its work."
  resultat: "The fixes have been live since the week of September 28, 2026, after the learning designer reviewed a sample."
plusLoin:
  - titre: "The grid"
    points:
      - "Faithfulness to the source. The question does not stray from its source."
      - "Correct answer. The expected answer is the right one."
      - "Quality of the explanation. The question includes one, and it does more than repeat the answer. The explanation is scored from 0 to 3."
      - "Language. The text is correct."
      - "Internal consistency. The parts of the question do not contradict each other."
      - "One defensible answer. No other answer can be defended as well as the correct one."
  - titre: "The verdicts"
    points:
      - "The verdict is “major” if the question strays from its source, or if its explanation does not help learners."
      - "It is “minor” for a language error, or for an explanation that is correct but could be better."
      - "A criterion counts as failed only if it was checked. What could not be measured does not count against the question."
  - titre: "The automated checks"
    points:
      - "The audio, read through its transcript, says what the question claims it says."
      - "The text and image materials contradict neither the question nor the audio."
      - "The question is about what the audio and the materials say."
      - "The answer options match the question asked."
      - "The explanation refers to the same audio, the same materials and the same answers as the question."
  - titre: "The lessons, on the technical side"
    points:
      - "The right context: a short instruction file, under 300 lines; instructions specific to each folder, loaded according to the file being edited (glob-based rules); know-how loaded on demand (skills); modules of 500 lines at most."
      - "Decisions written down: one record per decision (ADR), more than two hundred logged in four weeks, each with its estimated and actual cost, recalibrated regularly."
      - "Verification: checkable rules become tests, and process rules become checks before every commit (pre-commit hook); review is handed to an agent that starts from scratch (fresh context)."
langue: en
cle: auditContenu
---

## Why audit

In the site’s feedback form, 1 in 3 pieces of negative feedback is about the content: that is what the UserVoice project found.

I led this work with a learning designer. I designed the audit grid and the tooling that applies it; she validated the grid and set the writing rules for the content.

The scope covers several courses that prepare learners for language certifications. We started with the oldest one.

## What the grid checks

The grid has six criteria, detailed under “Going further”: faithfulness to the source, correct answer, quality of the explanation, language, internal consistency, and one defensible answer.

Each question then gets one of four verdicts: blocking, major, minor, or nothing to fix. A question is blocking when learners cannot get it right. That happens when the expected answer is wrong, or when two answers can be defended equally well.

AI agents apply the grid, question by question, and their verdicts are cross-checked. In parallel, automated checks run over the whole corpus, first with fixed rules, then with an AI. They check that every part of a question says the same thing: the audio (through its transcript), the texts and images, the question, the answers and the explanation. A report then gives each question’s status and the issues raised against it.

<div data-schema="chaine-audit"></div>

## What we found

In the first course audited, 1 question in 20 was rated blocking. Learners failed these questions through no fault of their own.

This result does not speak for the other courses.

## Fixing without breaking

The tool never changes live questions itself. It produces batches of fixes, one per family of defects, meaning the same defect repeated across several questions. In each family, the learning designer reviews a sample, drawn from the least certain cases, and her decision covers the whole family.

A batch goes live as soon as the whole is better than what was there, even if a few defects remain. If a badly fixed question turns up later, we rework the check or the writing rule behind the error.

On the first course, the learning designer also checked the fixes on a test version of the site before they went live.

<figure>
  <a href="/captures/audit-contenu/carnet-relecture.png"><img src="/captures/audit-contenu/carnet-relecture.png" width="1360" height="1230" loading="lazy" decoding="async" alt="Review screen from an audit tool. A card marked BLOQUANT (blocking) shows a fill-in-the-blank English question, “She has been working in this department ___ 2019”, whose stored answer is A, “for”. The current explanation only asserts that A is correct. The check flags that the right answer is B. The proposed correction explains that “since” introduces a starting point. At the bottom, the decision line: approve, correct, reject."></a>
  <figcaption>The review log: for each case reviewed, the issue raised, the proposed correction and the decision. Synthetic data.</figcaption>
</figure>

## Benefits and business impact

Each fix gives learners back the chance to answer correctly. At the annual review, a school client asked for three things: a full analysis of its content, a formal process for fixing errors, and an end to multiple-choice questions where more than one answer can be defended. Feedback from its students pointed to the same problem.

The audit answers each request: the grid, the reviewed batches, the “one defensible answer” criterion. It reduces the risk of churn for this client, and the method applies to the next courses.

## What I took from it

This project is teaching me to build with AI, and I am still learning.

**Give the AI the right context, not all the context.** The AI rereads its instructions for every task: the longer they are, the slower, costlier and less precise it gets. I learned to keep a short core, and to store the rest separately, so it is loaded only when the task needs it.

**Write every decision down.** Each decision now fits in a short, dated record, with its estimated and then actual cost. The AI rereads it before acting, and the gap between estimate and actual teaches me to estimate better.

**Get the work checked.** A written instruction ends up forgotten, and “it’s done” proves nothing. Whatever can be checked becomes an automated check, and what one AI produces, another AI, starting from scratch, reviews. It is the rule of the audit itself: the reviewer is not the author.
