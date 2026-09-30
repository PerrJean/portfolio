---
titre: "UserVoice: listening to learners every Monday"
date: "2026-09"
fait: "1 in 3 pieces of negative feedback left on the site is about the content."
synthese:
  probleme: "An EdTech platform receives thousands of pieces of learner feedback a year, spread across four sources and never read together."
  action: "I brought them together in a single table. AI classifies each piece of feedback with a confidence score and leaves the doubtful cases to a person. The summary takes five minutes to read, every Monday."
  resultat: "We thought it was mostly bugs. The data pointed to the content, and the effort moved to its quality."
plusLoin:
  - titre: "What I set aside"
    points:
      - "Double human categorization. Only the signature is entered by a person; the rest is derived from the dated data."
      - "Any writing to the source. We read it and never change it."
      - "A report organized around statistical variations. It did not show whether a topic was being handled."
  - titre: "Pitfalls paid for"
    points:
      - "Formats that spreadsheets distorted, such as very long identifiers."
      - "A dashboard that stopped updating without anyone noticing."
langue: en
cle: uservoice
---

## The starting point

Feedback comes from four sources: the NPS survey, the placement test, the end of each course, and an open feedback form available on every page of the site.

In September 2026, I launched UserVoice on the feedback gathered since March. Until then, it had not been tagged. Each piece stayed in its own source, and the same topics kept coming back without anyone knowing whether they had already been handled.

## Listening every Monday

I started from the questions I wanted to be able to answer every week. Which topics come up most? Are they being handled? Has a new topic appeared without anyone noticing?

Answering them meant reading the four sources together. In the shared table, each piece of feedback keeps the context of the day it was submitted, so it still reads that way months later.

Each piece of feedback is then classified, depending on whether it reports a bug or is about satisfaction.

<figure>
  <a href="/captures/uservoice/analyse.png"><img src="/captures/uservoice/analyse.png" width="1360" height="1406" loading="lazy" decoding="async" alt="Screenshot of the UserVoice Analysis page: four category cards (explanations, ergonomics, exercises, progression), each showing the share of comments that mention it and its curve over four quarters against the year before. Explanations come first, with 22 NPS points to gain."></a>
  <figcaption>The Analysis page tracks, quarter by quarter, the share of comments that mention each category against the year before, and ranks categories by the NPS points to gain. Synthetic data.</figcaption>
</figure>

## What the data showed

From March to September 2026, one in three pieces of feedback left in the site’s form is about the content.

The NPS survey confirms it. Over two months in summer 2026, nearly one comment in five concerns explanations, exercises or translations. Half of them are criticisms or requests.

Bugs are still tracked, signature by signature. But satisfaction depends first on the quality of the content and its explanations, so that is where there is the most to gain.

## Benefits and business impact

Every Monday, the summary takes five minutes to read, with the four sources brought together. It brings out weak signals we could not see before, when a topic that is still rare starts to rise. Above all, listening to learners showed, with figures to back it, that content quality weighed the most; it moved to the top of the priorities. At the annual review, a school client pointed to the same issue. The content audit project starts from that finding.

## What I built

I built UserVoice myself, with Claude Code, to prove its value before bringing the team in.

For each piece of feedback, AI proposes a category and a confidence score. Below a threshold, or when two categories come out too close to each other, the feedback goes to a human review queue. Each review adds to the examples given to the AI. Mechanical rules take over on obvious cases, such as empty answers or duplicates. The human review queue shrank by 87% in three days.

On top of the table, the dashboard has two layers: one shows what is changing, the other offers an explanation. The Monday summary sets the volume of each topic against its handling status. It tells, every Monday, which topics come back and whether they are handled.

<figure>
  <a href="/captures/uservoice/tableau-nps.png"><img src="/captures/uservoice/tableau-nps.png" width="1360" height="1327" loading="lazy" decoding="async" alt="Screenshot of the UserVoice NPS barometer (synthetic data): the overall NPS for the period, the split of scores into detractors, passives and promoters, the response rate, then one NPS bar per product and per market."></a>
  <figcaption>The NPS barometer: the period’s score, the spread of ratings, and each segment with its confidence interval and reliability level. Synthetic data.</figcaption>
</figure>

Every decision is logged in a register, and the code is checked by tests. Anyone who revisits a threshold can see why it was set.
