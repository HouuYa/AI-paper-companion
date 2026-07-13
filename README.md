# AI Paper Companion

> **Learn AI research papers systematically with LLM assistance, critical thinking, and structured knowledge building.**

AI Paper Companion is an open-source learning companion designed to help anyone—from beginners to experienced practitioners—study artificial intelligence research papers more effectively.

Rather than replacing human thinking, this project uses Large Language Models (LLMs) to reduce the friction of learning. LLMs generate an initial draft, while learners verify, refine, question, and transform that draft into genuine understanding.

The goal is not to produce more summaries.

The goal is to produce better learners.

---

# Why This Project?

Reading AI research papers is one of the most effective ways to understand modern artificial intelligence.

However, it is also one of the hardest.

Many learners encounter the same challenges:

* They do not know which paper to read first.
* Research papers are filled with unfamiliar terminology and mathematical notation.
* Individual papers are difficult to connect into a coherent learning journey.
* After reading a paper, they struggle to explain it in their own words.
* Much of what they learn is forgotten after only a few weeks.

As a result, many people stop reading papers altogether.

AI Paper Companion was created to address these challenges through a structured, LLM-assisted learning workflow.

## Research Scope

AI Paper Companion does **not** aim to summarize every AI research paper ever published.

Instead, the project focuses on a carefully curated collection of papers and educational resources that have had a significant impact on the development of modern artificial intelligence.

By following established learning paths rather than random paper collections, learners can build a coherent understanding of AI from its foundations to today's frontier models.

The primary research scope is defined by three complementary sources.

### 1. Ilya Sutskever's Foundational Reading List

The project begins with the widely shared collection of approximately **30 research papers** that Ilya Sutskever reportedly recommended to John Carmack as essential reading for understanding modern AI.

Although the original list is relatively small, it captures many of the breakthroughs that fundamentally changed the field of deep learning.

These papers provide the historical foundation for this repository.

---

### 2. Papers.com Learning Path

Papers.com extends the original reading list into a structured curriculum that follows the evolution of artificial intelligence through its major research milestones.

The learning path includes topics such as:

* Deep Learning
* Computer Vision
* Sequential Modeling
* Attention Mechanisms
* Transformers
* Graph Neural Networks
* Scaling Laws
* Reinforcement Learning
* Information Theory
* Complexity Theory
* AI Alignment

Rather than presenting isolated papers, Papers.com organizes them into a logical sequence that makes it easier to understand how one breakthrough led to the next.

---

### 3. AI Canon (a16z)

AI Canon, curated by Andreessen Horowitz (a16z), complements the research papers with carefully selected books, blog posts, talks, engineering articles, and educational resources.

While research papers explain *what* was discovered, AI Canon helps explain *why those discoveries mattered* and how they influenced the broader AI ecosystem.

---

Together, these three sources define the primary learning and research scope of AI Paper Companion.

Future papers may be added, but they should strengthen the learning journey rather than simply increase the number of papers.



---

# Our Philosophy

The central idea of this project is simple:

> **LLMs accelerate learning. Humans create understanding.**

An LLM should never replace critical thinking.

Instead, it should reduce repetitive work so learners can spend more time asking meaningful questions, making connections, and developing their own understanding.

In this project:

* LLMs generate the first draft.
* Humans perform critical review.
* Knowledge is built through reflection.
* Understanding is strengthened through explanation and retrieval.

Learning is an active process—not a passive one.

---

# Learning Methodology

Every paper follows the same structured workflow.

```text
Research Paper
        │
        ▼
LLM Draft Generation
        │
        ▼
Human Critical Review
        │
        ▼
Personal Notes
        │
        ▼
Quiz & Reflection
        │
        ▼
Structured Knowledge
        │
        ▼
Next Paper Recommendation
```

This workflow transforms reading into an iterative learning process.

---

# Learning Principles

## 1. Start with a Draft

A blank page is intimidating.

Instead of asking learners to summarize a paper from scratch, an LLM prepares a structured first draft.

This allows learners to focus on understanding rather than transcription.

---

## 2. Think Critically

Every AI-generated summary should be questioned.

Learners are encouraged to:

* verify factual accuracy,
* identify missing information,
* improve explanations,
* challenge assumptions,
* add personal insights.

Critical review is the most important step in the learning process.

---

## 3. Learn by Explaining

True understanding comes from the ability to explain an idea simply.

Each paper includes:

* a one-sentence summary,
* a beginner-friendly explanation,
* key contributions,
* limitations,
* related work,
* self-generated notes.

This approach is inspired by the Feynman Technique.

---

## 4. Learn by Retrieval

Reading is not enough.

Each paper also includes review questions and quizzes that encourage active recall.

Retrieval practice strengthens long-term memory far more effectively than passive rereading.

---

## 5. Learn Through Connections

Research papers do not exist in isolation.

Every paper answers three important questions:

* What earlier work inspired this paper?
* What problem does this paper solve?
* Which later papers build upon it?

Understanding these relationships is essential for developing an intuitive understanding of AI research.

---

# Learning Sources

The repository is organized around three complementary learning resources.

| Source                            | Purpose                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Ilya Sutskever's Reading List** | Study the foundational papers that shaped modern deep learning.                                                 |
| **Papers.com**                    | Follow a structured learning roadmap from foundational concepts to state-of-the-art AI systems.                 |
| **AI Canon (a16z)**               | Gain historical context, engineering insights, recommended books, talks, and influential educational materials. |

These resources are intentionally combined to answer three different questions:

* **What should I read first?** — Ilya Sutskever's Reading List
* **What should I read next?** — Papers.com Learning Path
* **Why is this work important?** — AI Canon

By combining these perspectives, AI Paper Companion becomes more than a paper collection. It becomes a structured learning companion that guides learners through the evolution of modern artificial intelligence.


---

## Papers.com Learning Path

Papers.com builds upon the widely shared reading list of approximately thirty research papers that Ilya Sutskever reportedly recommended to John Carmack as foundational reading for understanding modern AI.

The curriculum has since expanded into a structured roadmap covering:

* Deep Learning
* Computer Vision
* Sequential Modeling
* Attention
* Transformers
* Graph Neural Networks
* Scaling Laws
* Reinforcement Learning
* Information Theory
* Complexity Theory
* AI Alignment

---

## Personal Learning Journey

This repository is also a personal study journal.

Every paper includes:

* beginner-friendly explanations,
* concept maps,
* quizzes,
* personal insights,
* links to related papers.

The objective is not to collect summaries but to build lasting understanding.

---

# Repository Structure

```text
docs/
    Vision
    Learning Workflow
    Learning Sources
    Paper Template

prompts/
    LLM Prompts
    Review Prompts
    Quiz Prompts

papers/
    Draft Papers
    Reviewed Papers
    Templates

database/
    Supabase Schema

examples/
    Example Papers

n8n/
    Automation Workflow

frontend/
    Future Web Application
```

---

# Roadmap

## Phase 1 — AI Paper Companion

* Structured paper notes
* Beginner-friendly explanations
* LLM-assisted review
* Quiz generation
* Reading recommendations

## Phase 2 — AI Research Companion

* Semantic search
* Concept graph
* Paper relationships
* Personalized learning dashboard

## Phase 3 — AI Safety Research Platform

The knowledge accumulated through this project can later be extended to support AI safety research, governance, standardization, and auditing.

```text
                  AI Canon
                     │
                     │
      Historical Context & Engineering Insights
                     │
                     ▼
        Papers.com Learning Roadmap
                     │
                     ▼
 Ilya Sutskever's Foundational Papers
                     │
                     ▼
           LLM Draft Generation
                     │
                     ▼
         Human Critical Review
                     │
                     ▼
          Personal Knowledge Base
                     │
                     ▼
         AI Research Companion
```


---

# Long-Term Vision

Artificial intelligence is advancing rapidly.

Keeping up with new research requires more than reading papers—it requires a systematic approach to learning.

AI Paper Companion aims to become an open-source platform that helps learners develop deep understanding rather than superficial familiarity.

The project begins with reading papers.

It grows into understanding ideas.

Ultimately, it becomes a lifelong companion for learning artificial intelligence.

---

# Guiding Principle

> **The purpose of AI Paper Companion is not to replace reading research papers.**

> **Its purpose is to help people read, understand, remember, and connect research papers more effectively.**

Learning happens through curiosity.

Understanding comes through critical thinking.

Technology should support that journey—not replace it.
