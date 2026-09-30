---
titre: "Platform merger: from three to two, aiming for one"
date: "2024-08"
fait: "In August 2024, before the new school year, the platform for businesses joined the general platform. One platform out of three was retired."
synthese:
  probleme: "An EdTech platform offered three language-learning platforms, built one after another. Each had its own interface, activity templates and data model, so every change had to be built three times."
  action: "As Product Manager (PM), then project lead, I framed a target, a single platform, and presented it to the executive committee. With a team of about ten people, we first laid down a shared design system, then merged the platform for businesses into the general platform, in seven batches."
  resultat: "The merger has been in production since August 2024. Activities now run on four templates instead of about thirty, and the share of feedback about usability dropped by a quarter. This project opened the way to the Head of Product role."
plusLoin:
  - titre: "Timeline"
    points:
      - "February 2023: review of accessibility and of design gaps between the platforms."
      - "March to October 2023: design system, from the first components to the first page built with them, the sign-up page."
      - "September 2023: target framed and presented to the executive committee."
      - "March 2024: shared navigation across the three platforms. April 2024: a shared learning paths page."
      - "January to August 2024: user research, specifications, mockups, development and acceptance testing of the new templates."
      - "August 2024: the merger goes live. November 2024: a sign-up flow shared by the three platforms."
  - titre: "The seven batches"
    points:
      - "Before go-live: the shared navigation bar, the activity templates, the business sign-up flow on the general platform, updates to its pages (home, learning paths, statistics, certification), then technical changes (single sign-on, infrastructure, white label) and editorial ones."
      - "After go-live: cleanup of the infrastructure, the database and the content management tool, then lower-priority improvements."
  - titre: "The activity templates"
    points:
      - "The material is a text, an image, an audio clip or a video; the question is single or multiple choice, fill in the blanks, reordering or matching."
      - "Combinations are chosen by skill and by level of the Common European Framework. For example, an audio clip followed by a fill-in-the-blanks question trains phonetic recognition from level A1."
      - "Cleanup along the way: one instruction where there used to be two, sometimes in two languages or contradicting each other; a shorter title, a more visible audio player."
langue: en
cle: fusion
---

## Three platforms, three times the work

Three language-learning platforms had been built one after another: one to prepare for exams, one for businesses, one general.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/avant-apres.en.svg" width="736" height="612">
    <img src="/illustrations/fusion/avant-apres.etroit.en.svg" width="350" height="574" loading="lazy" decoding="async" alt="Before: three platforms, each with its own interface, activity templates and data, each drawn with a different line. After: the exam prep platform and the general learning platform, which takes in the business content and moves to four shared templates, both built on a shared design system. Dotted: the single platform, second step, not yet under way.">
  </picture>
  <figcaption>Before the merger, three platforms and three ways of working; after, two platforms on one shared foundation.</figcaption>
</figure>

So every change was built and maintained three times. A learner moving from one platform to another met a different navigation and design, and launching a new kind of exercise required development work. Bringing the platforms together meant building once, and giving learners a single point of reference.

## Aim for one platform, merge in two steps

In September 2023, I framed the target and presented it to the executive committee: a single platform, organized around skills rather than three product lines. To get there, I chose a step-by-step path where each stage pays off as soon as it ships, with no throwaway code.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/trajectoires.en.svg" width="736" height="336">
    <img src="/illustrations/fusion/trajectoires.etroit.en.svg" width="350" height="316" loading="lazy" decoding="async" alt="Three paths of value delivered over time. The chosen path climbs step by step, every step pays off. Shipping fast climbs quickly, then flattens under debt. Building it clean stays flat for a long time.">
  </picture>
  <figcaption>Three paths of value delivered over time: the chosen path climbs step by step.</figcaption>
</figure>

The first step brought together the platform for businesses and the general platform, for two reasons. These two were the closest, in design as well as in data structure. And both are for learning a language, while the exam platform is for preparing a language exam, a different lens.

This first step called for three trade-offs.

- **Keep the three product lines visible.** The product was not ready to move past that presentation. Only the navigation became shared.
- **Go live in the summer.** Merging two platforms carried a high risk of incidents and required taking the site down for maintenance. Doing it before the new school year kept it clear of the arrival of new learners.
- **Postpone the cleanup** of the infrastructure and the database until after go-live.

## Shared foundations first, then seven batches

The merger rested on a design system launched in 2023, a component library shared by design and development. Before the merger, it already served learners with shared navigation across the three platforms, then a shared learning paths page.

The heaviest batch covered the activity templates. User interviews and comments from NPS surveys showed a mental load caused by the interface itself. Each platform had its own templates, about thirty between the two. We brought them down to four, shared by both. All existing content had to fit into them, which meant first aligning the two data models.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/gabarits.en.svg" width="736" height="211">
    <img src="/illustrations/fusion/gabarits.etroit.en.svg" width="350" height="487" loading="lazy" decoding="async" alt="Left: some thirty activity templates, all different. Right: four shared templates, each made of a media block and a question.">
  </picture>
  <figcaption>Some thirty activity templates, brought down to four shared templates, each made of a media block and a question.</figcaption>
</figure>

We were a team of about ten people, mostly developers, with a designer, a junior PM, and the learning design team alongside us. As project lead and PM, I owned the schedule and the split into batches, defined the target data model, wrote the specifications and ran acceptance testing. The lead developer owned the technical architecture, and the designer the components, the mockups and the user interviews.

## Benefits and business impact

The platform for businesses has been gone since August 2024. Any future development is now done twice instead of three times, with one fewer codebase to maintain.

For learners, the share of feedback about usability went from 8% between January and August 2024 to 6% between September and December, a quarter less. Activities were designed to the accessibility standard, something public-sector education clients expect.

For the learning design team, a new exercise no longer requires development: they pair any material with any type of question.

## What I took from it

This project, led as PM and then as project lead, opened the way to the Head of Product role: it called for running a complex project with a large team. I draw three lessons from it.

**Set the target, then a first step that stands on its own.** The single platform remained the horizon. The first step had to be worth it by itself, with one fewer platform to maintain, even if the second was slow to come.

**Build shared foundations before merging.** The design system and the aligned data model came first. Prepared this way, the switch could happen over the summer.

**Revisit the target as the context changes.** The second step, with the exam platform, has not happened: the opportunity has not come up. The two platforms are growing closer with each new project, but keep distinct goals, learning a language and preparing for an exam, with specific features that need to remain. The cost/opportunity analysis has not yet come out in favor. And AI opens up new learning experiences, which push toward thinking fresh rather than building on what already exists.
