---
titre: "Understanding the NPS drop"
date: "2026-10"
cadre:
  role: "Designed and led the analysis, with AI"
  equipe: "Alone for the analysis; account managers and the product team for the surveys and the readout"
  duree: "October 2026, ongoing"
fait: "I tested seventeen hypotheses on the NPS drop: it was not the product, but the profile of the users surveyed."
synthese:
  probleme: "At the start of the 2026 school year, the NPS (Net Promoter Score, the likelihood-to-recommend score, from −100 to +100) of learners on an EdTech platform fell by around twenty points in a month."
  action: "I wrote the analysis before building the dashboard pages, then tested each possible explanation with AI, one by one."
  resultat: "The score depended first on the users’ profile and on how their organisation rolled out the solution. Two levers came out of it, and three decisions were made on 9 October."
plusLoin:
  - titre: "The seventeen hypotheses in detail"
    points:
      - "The drop comes from the survey change (late July 2026, an in-app survey replaced the former survey tool). Test: the same organisations, before and after. Result: about one point apart, on a scale of −100 to +100. Rejected."
      - "Learners have become less satisfied. Test: separate the effect of who answers from the effect of what they think, then follow several thousand learners who answered twice. Result: more than 80% of the drop came from a change in profile; the same learner scored as before (+0.2 point). Rejected."
      - "Content explains the score. Test: measure how much of the gap between learners comes from their organisation, and how much from the content they study. Result: the organisation accounted for 83 to 89% of the gap. From one piece of content to another, the score varied by ± 6 points; from one organisation to another, by ± 25. Rejected."
      - "The users’ profile explains the score. Test: six learner profiles. Result: up to 45 points apart, from vocational high schools and apprentice training centres to individual learners. Held."
      - "Mandatory use lowers the score. Test: classify each organisation, from sales data, by whether the solution is mandatory or chosen. Result: 21 to 23 points lower when it was mandatory, with both the former and the new survey. Held."
      - "Higher education schools all share the same user profile. Test: classify more than a hundred schools by type, from public information. Result: 58 points separated top business schools from private work-study schools; engineering schools sat in between. Rejected."
      - "General English and Business English disappoint through their content. Test: compare scores by content studied and by whether the solution was mandatory or chosen. Result: chosen, they scored well; mandatory, they lost 55 to 59 points. Exam preparation held up when mandatory, because the learner is aiming for a score. Rejected."
      - "Learners who finish their learning path at the end of the semester score more harshly. Test: compare within organisation, that is between learners of the same organisation, by point in the course and by month, over two years. Result: a slight dip in May-June (2 to 4 points); those finishing in a hurry scored like the others. Rejected."
      - "Low-activity learners drag the score down. Test: their weight in the score, within organisation. Result: they scored like the active learners of their organisation (0.2 point apart). Rejected."
      - "Learners closely followed by their teachers are more satisfied. Test: teacher activity in nearly 150 organisations, compared across organisations and over time. Result: no link. The correlation, which measures from −1 to +1 whether two figures move together, was 0.01. Rejected."
      - "The survey comes too early, before the learner has discovered the solution. Test: the score by time since the learner’s access opened. Result: in the most negative school, rejection was immediate and stable, two points apart between day one and day thirty. Rejected."
      - "Unhappy learners answer less often than others. Test: one learner in four answered; responses were reweighted, giving more weight to profiles that answer little, over tens of thousands of survey invitations. Result: the silent ones looked like detractors (scores of 0 to 6), and the real NPS would be about three points lower. Held."
      - "The more an organisation uses the solution, the happier its learners are. Test: licence usage rate and score, in some forty organisations. Result: the opposite, with a correlation of −0.37. The more use was mandated, the lower the score. Rejected, reversed."
      - "A score target (reaching a given mark in an exam) satisfies learners more than an hours target (spending a given number of hours on the solution). Test: a survey of account managers covering some fifteen accounts, then the targets actually set in the solution by more than 80 organisations. Result: 91 points apart in the survey, 5 in the real data. The margin of uncertainty ran from −24 to +29 and included zero. Rejected."
      - "Organisations set hours targets where the solution is little used (the reverse of the previous hypothesis). Test: solution usage before the target was set. Result: no difference (ratio of 1.01). Rejected."
      - "A low score signals that a client will leave. Test: contract renewals, in sales data. Result: too few departures to conclude. Inconclusive."
      - "The analysis gives too much weight to schools. Test: the weight of each market in scores and in business activity. Result: education weighed the same in both. Client companies were almost absent from the scores, though they count for much more in the business: a blind spot. Partly held."
  - titre: "The methods"
    points:
      - "Confidence intervals, the margin of uncertainty around a score, with a correction when many groups are compared at once, so that chance is not mistaken for a gap."
      - "Decomposing a change: how much comes from who answers, how much from what learners think."
      - "Within-organisation comparison, between learners of the same organisation, to neutralise what is specific to each client."
      - "Following the same learners from one answer to the next, allowing for extreme scores drifting back towards the average."
      - "Reweighting non-responses, with a test that checks the result holds when the weights change."
      - "The Mann-Whitney test, which compares two groups without assuming the shape of their scores, run with and without weighting so that a few large clients could not swamp the result."
langue: en
cle: analyseNps
---

## The starting point

I had eight dashboard pages and plenty of charts, but no written finding. I stopped building pages and wrote the analysis first.

## Testing each explanation, keeping the ones that held

Each possible explanation of the drop became a hypothesis, tested on the data with AI. My role was to frame each hypothesis, say which decision it had to inform, challenge the method and check the numbers.

In the table, an organisation means the client school or company. “Mandatory use” means the organisation requires its learners to use the solution. Of seventeen hypotheses, three held, one held in part, twelve were rejected and one remained inconclusive.

| Hypothesis | Verdict |
|---|---|
| The users’ profile explains the score | Held |
| Mandatory use lowers the score | Held |
| Unhappy learners answer less often than others | Held |
| The drop comes from the survey change | Rejected |
| Learners have become less satisfied | Rejected |
| Content explains the score | Rejected |
| Higher education schools all share the same user profile | Rejected |
| General English and Business English disappoint through their content | Rejected |
| Learners who finish their learning path at the end of the semester score more harshly | Rejected |
| Low-activity learners drag the score down | Rejected |
| Learners closely followed by their teachers are more satisfied | Rejected |
| The survey comes too early, before the learner has discovered the solution | Rejected |
| The more an organisation uses the solution, the happier its learners are | Rejected, reversed |
| A score target satisfies learners more than an hours target | Rejected |
| Organisations set hours targets where the solution is little used | Rejected |
| A low score signals that a client will leave | Inconclusive |
| The analysis gives too much weight to schools | Partly held |

## What the analysis established

The new school year brought other users, who score more harshly. The overall NPS blended old and new users together and suggested a product in decline.

General English and Business English scored well when the solution was chosen; when it was mandatory, they lost more than 50 points. The product won over those who chose it; for learners for whom it was mandatory, the lever was the rollout.

## Two levers, three product priorities

The first lever is the rollout, carried by the account managers with help from the product team. It means understanding the clients where the solution is heavily used and well rated, and acting before day one where it is rejected. Rejection happens as soon as access opens.

The second lever is the product, with three priorities. First, audit the most used content, starting with exam preparation. Second, create short learning paths with a visible goal for General English and Business English. Third, add speaking activities, including AI role-plays.

The analysis also proposed reading NPS by user profile rather than setting one overall NPS target. Two indicators go with it. The first is the share of detractors (scores of 0 to 6) where the solution is mandatory. The second tracks usage in client companies, which still rarely answer the NPS survey.

## What was decided on 9 October

On 9 October 2026, three decisions were made:

- a qualitative study of learners for whom the solution is mandatory, in the targeted organisations;
- continued content fixes, in the Content audit project;
- a presentation of the analysis to B2B sales leadership.

The numbers no longer explain everything: two schools with the same rollout were scored 78 points apart. Several hundred learners volunteered for an interview.

## What I take away

With AI, producing an analysis is fast: the bottleneck becomes checking the numbers.
