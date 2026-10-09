---
titre: "UserVoice: listening to learners every Monday"
date: "2026-09"
cadre:
  role: "Designed and built the tool"
  equipe: "On my own, with AI"
  duree: "September 2026"
fait: "1 in 3 pieces of negative feedback left on the site is about the content: its quality became the top priority."
synthese:
  probleme: "An EdTech platform receives thousands of pieces of learner feedback a year, spread across four sources and never read together."
  action: "I brought them together in one place. AI classifies each piece of feedback and flags when it is unsure: a person decides, and that answer helps the AI tell similar cases apart next time. The summary takes five minutes to read, every Monday."
  resultat: "We thought it was mostly bugs. The data pointed to the content, and the effort moved to its quality."
langue: en
cle: uservoice
---

## The starting point

Feedback comes from four sources: the NPS (Net Promoter Score, how likely learners are to recommend the platform) survey, the placement test, the end of each course, and an open feedback form available on every page of the site.

In September 2026, I launched UserVoice on the feedback gathered since March. Until then, it had not been tagged. Each piece stayed in its own source, and the same topics kept coming back without anyone knowing whether they had already been handled.

## Listening every Monday

I started from the questions I wanted to be able to answer every week. Which topics come up most? Are they being handled? Has a new topic appeared without anyone noticing?

Answering them meant reading the four sources together. In the shared tool, each piece of feedback keeps the context of the day it was submitted, so it still reads that way months later.

AI then classifies each piece of feedback: a reported bug, or a comment on satisfaction.

<figure>
  <a href="/captures/uservoice/analyse.png"><img src="/captures/uservoice/analyse.png" width="1360" height="1406" loading="lazy" decoding="async" alt="Screenshot of the UserVoice Analysis page: four category cards (explanations, ergonomics, exercises, progression), each showing the share of comments that mention it and its curve over four quarters against the year before. Explanations come first, with 22 NPS points to gain."></a>
  <figcaption>The Analysis page tracks, quarter by quarter, the share of comments that mention each category against the year before, and ranks categories by the NPS points to gain. Synthetic data.</figcaption>
</figure>

## What the data showed

From March to September 2026, one in three pieces of negative feedback left in the site’s form was about the content.

The NPS survey confirms it. Over two months in summer 2026, nearly one comment in five concerned explanations, exercises or translations. Half of them were criticisms or requests.

Bugs are still tracked, signature by signature. But satisfaction depends first on the quality of the content and its explanations, so that is where there is the most to gain.

## Benefits and business impact

The Monday summary spots a topic that is still rare as soon as it starts to rise, which we could not see before. At the annual review, a client school also pointed to content quality. The content audit project starts from that finding.

## What I built

I built UserVoice myself, with Claude Code, an AI coding assistant, to prove its value before bringing the team in.

For each piece of feedback, AI proposes a category. When it is not confident, or hesitates between two close categories, it says so, and the feedback waits for someone to review it. Each review joins the examples the AI relies on to classify the next pieces of feedback. Mechanical rules take over on obvious cases, such as empty answers or duplicates. In three days, the queue of feedback awaiting review shrank by 87%.

The dashboard has two layers: one shows what is changing, the other offers an explanation. The Monday summary sets the volume of each topic against its handling status.

<figure>
  <a href="/captures/uservoice/tableau-nps.png"><img src="/captures/uservoice/tableau-nps.png" width="1360" height="1327" loading="lazy" decoding="async" alt="Screenshot of the UserVoice NPS barometer (synthetic data): the overall NPS for the period, the split of scores into detractors, passives and promoters, the response rate, then one NPS bar per product and per market."></a>
  <figcaption>The NPS barometer: the period’s score, the spread of ratings, and each segment with its confidence interval and reliability level. Synthetic data.</figcaption>
</figure>
