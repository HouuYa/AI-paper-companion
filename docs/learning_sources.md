# AI Paper Companion Learning Sources

본 문서는 AI Paper Companion의 핵심 학습 영역을 구성하는 세 가지 주요 소스(Ilya Sutskever's Reading List, Papers.com Roadmap, AI Canon)의 구체적인 목록과 메타데이터를 제공합니다.

---

## 1. Ilya Sutskever's Foundational Reading List (Carmack List)

이 목록은 OpenAI의 전 최고과학자 일리야 수츠케버(Ilya Sutskever)가 존 카맥(John Carmack)에게 현대 딥러닝과 인공지능의 "90% 핵심"을 마스터하기 위해 추천한 약 30개의 논문 및 자료 리스트입니다.

| 순번 | 자료/논문 제목 (원제) | 핵심 내용 & 학습 카테고리 |
| :--- | :--- | :--- |
| 1 | **The Annotated Transformer** | Attention Is All You Need 논문의 소스코드 레벨 해설서 (Transformer) |
| 2 | **The First Law of Complexodynamics** (Scott Aaronson) | 복잡계와 계산 복잡도 및 열역학과의 연결성 (Complexity Theory) |
| 3 | **The Unreasonable Effectiveness of Recurrent Neural Networks** (Andrej Karpathy) | RNN이 시퀀스 데이터를 생성하는 원리 및 직관적 해설 (Sequence Modeling) |
| 4 | **Understanding LSTM Networks** (Christopher Olah) | LSTM의 게이트 구조를 시각적으로 해설한 명작 블로그 (Sequence Modeling) |
| 5 | **Recurrent Neural Network Regularization** (Zaremba et al.) | LSTM에서 Dropout을 적용하여 과적합을 방지하는 정규화 기술 (Sequence Modeling) |
| 6 | **Keeping Neural Networks Simple by Minimizing the Description Length of the Weights** (Hinton & Van Camp) | 가중치 압축과 MDL 원리를 신경망에 적용한 논문 (Information Theory) |
| 7 | **Pointer Networks** (Vinyals et al.) | 출력 사전 크기가 고정되지 않고 입력 시퀀스를 참조하는 NMT 발전판 (Attention) |
| 8 | **ImageNet Classification with Deep CNNs (AlexNet)** (Krizhevsky et al.) | 현대 딥러닝 혁명의 신호탄이 된 CNN 모델 (Computer Vision) |
| 9 | **Order Matters: Sequence to sequence for sets** (Vinyals et al.) | 순서가 없는 집합을 입력으로 처리하는 Seq2Seq 확장 (Sequence Modeling) |
| 10 | **GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism** | 거대 신경망을 병렬화하여 다수 GPU에서 학습시키는 파이프라인 (Scaling Laws) |
| 11 | **Deep Residual Learning for Image Recognition (ResNet)** (He et al.) | Skip Connection을 통해 깊은 신경망의 학습 정체를 해결 (Computer Vision) |
| 12 | **Multi-Scale Context Aggregation by Dilated Convolutions** (Yu & Koltun) | 해상도 저하 없이 수용 영역(Receptive Field)을 넓히는 확장 합성곱 (Computer Vision) |
| 13 | **Neural Quantum Chemistry** (Gilmer et al.) | 양자 화학 에너지를 예측하기 위해 신경망을 접목한 선구적 연구 (GNN/Applications) |
| 14 | **Attention Is All You Need** (Vaswani et al.) | RNN과 CNN 없이 오직 Attention만으로 시퀀스를 처리하는 Transformer 최초 제안 (Transformer) |
| 15 | **Neural Machine Translation by Jointly Learning to Align and Translate** (Bahdanau et al.) | 기계 번역에서 Alignment(정렬) 개념을 가진 Attention 최초 도입 (Attention) |
| 16 | **Identity Mappings in Deep Residual Networks** (He et al.) | ResNet의 Skip Connection 경로 상에 비선형 활성화를 없앤 아키텍처 개선 (Computer Vision) |
| 17 | **A Simple NN Module for Relational Reasoning** (Santoro et al.) | 객체 간의 관계 추론에 특화된 단순한 신경망 모듈 (Reasoning) |
| 18 | **Variational Lossy Autoencoder** (Chen et al.) | VAE의 표현 잠재 차원 붕괴 현상을 극복한 Autoencoder (Generative Models) |
| 19 | **Relational RNNs** (Santoro et al.) | 관계 기억 메모리를 결합하여 추론 능력을 강화한 RNN (Sequence Modeling) |
| 20 | **Quantifying the Rise and Fall of Complexity in Closed Systems: The Coffee Automaton** | 정보의 흐름과 열역학적 엔트로피 관계 (Complexity Theory) |
| 21 | **Neural Turing Machines** (Graves et al.) | 외부 메모리 주소 지정 장치를 부착해 알고리즘 학습을 가능케 한 신경망 (Architecture) |
| 22 | **Deep Speech 2: End-to-End Speech Recognition** | 연결주의 시간 분류(CTC) 기법을 활용한 대규모 한국어/영어 음성인식 (Applications) |
| 23 | **Scaling Laws for Neural Language Models** (Kaplan et al.) | 모델 성능이 파라미터 수, 데이터, 컴퓨팅 예산에 따라 멱법칙을 따름을 규명 (Scaling Laws) |
| 24 | **A Tutorial Introduction to the Minimum Description Length Principle** (Grünwald) | 지능과 학습을 압축의 최적화로 간주하는 수학적 원리 (Information Theory) |
| 25 | **Machine Super Intelligence** (Shane Legg) | AGI의 정의와 벤치마크 및 기계 초지능의 초기 이론적 기초 (AI Alignment/AGI) |
| 26 | **CS231n: Convolutional Neural Networks for Visual Recognition** | 스탠포드 대학의 CNN 기반 컴퓨터 비전 강의 리소스 (Foundational Course) |

---

## 2. Papers.com Roadmap
Papers.com은 상기 일리야의 30대 추천 논문을 근간으로 삼아, 신경망의 태동기부터 프런티어 모델까지의 발자취를 추적할 수 있도록 11개의 테마로 확장한 교육 로드맵입니다:
1. **Deep Learning Foundations** (Backpropagation, SGD)
2. **Computer Vision** (AlexNet, ResNet, Dilated Convolutions)
3. **Sequence Modeling** (RNN, LSTM, Seq2Seq)
4. **Attention Mechanisms** (Bahdanau Attention, Pointer Networks)
5. **Transformers** (Attention Is All You Need, GPT, BERT)
6. **Graph Neural Networks (GNN)** (Message Passing, Relational Reasoning)
7. **Scaling Laws** (Kaplan's Scaling Laws, GPipe)
8. **Reinforcement Learning** (DQN, PPO)
9. **Information Theory** (MDL, Kolmogorov Complexity)
10. **Complexity Theory** (Complexodynamics)
11. **AI Alignment & Safety** (RLHF, Governance)

---

## 3. AI Canon (a16z)
a16z에서 큐레이션한 인류 AI 발전사 및 엔지니어링 바이블을 결합하여, 논문 연구 결과들이 현대 테크 생태계에 왜 혁신을 가져왔는지 산업적 관점의 컨텍스트를 제공합니다.
* 예: Transformer 구조를 차용한 하드웨어 아속 가이드, 분산 학습 엔지니어링 모음집 등.
