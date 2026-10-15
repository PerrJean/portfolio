---
titre: "Client dashboard: listening to five clients before building"
date: "2026-06"
cadre:
  role: "Head of Product, Product Manager on the project"
  equipe: "A Product Designer and two developers"
  duree: "April → June 2026, then tracking usage"
fait: "Before building a dashboard, I asked five clients which decisions they had to make, when and to what end, rather than which charts they wanted."
synthese:
  probleme: "An EdTech language-learning platform equips businesses and schools. Once the platform is rolled out at a client, its learners have to take it up quickly, and in large numbers. Management wanted clients to track this themselves, with a dashboard."
  action: "Before development, I brought five clients together in a workshop. We started from the decisions they have to make, then showed them the team’s mockups."
  resultat: "The workshop confirmed the mockups and narrowed the dashboard down to one metric: time spent, compared with a target, by contract, by group and by learner. Live since June, it has been adopted: more than half of the organisations that opened it in September came back in October."
plusLoin:
  - titre: "How the workshop ran"
    points:
      - "The instruction for the first part: one sticky note per situation, in the form “When…, I need…, so that…”. The example I gave: “When I prepare my monthly report, I need to know how active learners are, so that I can identify the groups that need support.”"
      - "The follow-up questions, to pin down the situation, the information and the decision: “what is it for?”, “at what level?”, “what decision will it inform?”. When a sticky note said “score”, “progress” or “dashboard”, I had it rewritten as a situation."
      - "What the facilitator watches for: not moving to solutions too early, steering away from “I want stats”, separating the need, the data they want and the format it comes in."
langue: en
cle: atelierPilotage
---

## Where it started

For each client, tracking learners’ activity relied partly on the account managers, the client’s dedicated contacts. They analysed the client’s data and suggested actions to get usage going again.

Management wanted clients to do this tracking themselves, with a dashboard in the area where they manage their learners. The idea made sense. I treated it as a hypothesis to check before development: did clients have this need, and which problem should be solved first?

## Three risks before development

I named three risks, to know what to check with clients.

- **A need to confirm with clients.** Account managers already run some analyses for them: nothing showed that clients wanted to run them on their own, or could.
- **Different clients.** A business and a school do not necessarily have the same goals, or the same constraints.
- **A scope that keeps growing.** A dashboard quickly turns into a pile of figures, charts, filters and exports, with no clear decision to serve.

So I wanted to start from the decisions clients make when tracking their learners, rather than from a list of features.

## The workshop

In April 2026, I ran a workshop with five clients: four schools and one business. Around the table were mostly training managers or heads of teaching. The timeline shows its three parts: the first and the last took up most of the session.

<!-- DIAGRAM: workshop timeline -->

First, each participant wrote situations from their work on sticky notes, such as preparing a monthly report. The brief was one sentence: “When…, I need…, so that…”. For each situation, I asked what information they needed and what decision it was for.

The second part, on the format for the figures (email, export, dashboard), was cut short.

Finally, participants saw the team’s mockups and a demo. I asked them whether these screens helped them decide, what was missing and what should be removed.

## What clients said

All five clients named the same need first: tracking the time their learners spend on the platform. On its own, that figure was not enough for them. They wanted to compare it with a target they set themselves.

The diagram shows this with an example made up for the page.

<!-- DIAGRAM: from data to decision -->

A learner who aims for 10 hours and has spent 6 has reached 60% of their target. On its own, time spent does not say whether a learner is engaged. Set against a target, it shows who is falling behind, and so where to act.

Clients wanted to read this gap at three levels. The contract gives the overall picture. The group shows which classes or teams are falling behind, and the learner level shows who has reached their target.

<!-- DIAGRAM: the three levels -->

The needs of the four schools and the business converged. The signal is encouraging, but a single business is not enough to generalise from.

The team’s mockups already met these expectations, and the workshop confirmed them. Above all, it settled what the first version would contain: one metric, one target, three levels, rather than every possible statistic.

## What was built

The dashboard has been live since 25 June 2026, replacing the old statistics page. It follows what came out of the workshop to the letter.

<!-- SCREENSHOT: the dashboard, dummy data -->

At the top are average time and the share of learners who are active and on track. In the middle, cumulative time runs against the target line. At the bottom, each learner shows how far ahead or behind they are.

Usage took off with the new school year. In September, one in six active client organisations opened the dashboard; in the first half of October, nearly one in three already had. More than half of the organisations that opened it in September came back in October, compared with fewer than one in three from July to August.

Part of this rise is down to the season and the retirement of the old page: these figures measure adoption, not its effect on learners. So far, it is used mostly by teachers rather than by the managers who attended the workshop.

The dashboard is in use, and we have not changed it since. The next piece of work is another way to query the data: typing a question to get the answer as figures.

## What I took from it

**Question a request, even a sensible one.** Checking it before development avoids investing blind. Here, the workshop showed where to start.

**Discovery can confirm a hypothesis.** The workshop confirmed the starting idea instead of overturning it. The team built the dashboard knowing why it met the need, and what it could leave aside.

**Start from the decision to be made.** I ask one question first: what decision does the client have to make, and what information do they need for it? The list of statistics to display follows from that.

