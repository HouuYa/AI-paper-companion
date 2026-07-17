import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Edit3, 
  Database, 
  Wifi, 
  WifiOff, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { isSupabaseConfigured } from './supabaseClient';

// Types definition
interface Paper {
  id: string;
  title: string;
  authors: string;
  publish_year: number;
  source_category: string;
  abstract: string;
  draft_content: string;
  reviewed_content: string;
  original_url: string;
}

interface Relation {
  source: string;
  target: string;
  type: string;
}

interface UserProgress {
  [paperId: string]: {
    status: 'unread' | 'reading' | 'reviewed';
    isQuizPassed: boolean;
    studyDuration: number;
  };
}

// Initial Mock Papers (Focusing on Ilya's top papers)
const MOCK_PAPERS: Paper[] = [
  {
    id: 'paper-1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al.',
    publish_year: 2017,
    source_category: 'Sutskever List',
    abstract: 'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    draft_content: `> **인류는 문자를 발명한 이래 끊임없이 텍스트를 기계적으로 번역하고 이해하려 시도했음.**
> **하지만 시퀀스(시간 순서대로 배열된 데이터)를 한 자씩 순차적으로 읽어야만 했던 기존 연산 구조는 거대한 텍스트의 장벽 앞에서 멈춰 섰음.**
> **이 논문은 순차적 연산의 족쇄를 끊어내고, 기계가 문맥 전체를 한눈에 조망할 수 있는 새로운 눈을 제공했음.**

---

## 1. 핵심 요약 (Abstract & Summary)

1. 기존의 기계 번역은 RNN(순환신경망)과 LSTM(장단기메모리)처럼 입력 단어를 순차적으로 하나씩 처리하는 모델에 의존했음.

2. 순차적 처리 구조는 문장이 길어질수록 앞서 나온 정보를 잊어버리는 병목 현상과, GPU를 활용한 병렬 연산이 불가능하다는 구조적 한계를 가졌음.

3. 본 논문은 순환 구조를 완전히 제거하고, 오직 셀프 어텐션(Self-Attention, 자기 주시 메커니즘)만으로 전체 문장의 관계를 파악하는 Transformer 아키텍처를 제안함.

---

## 2. 주요 기여 및 구조 (Key Contribution)

4. 멀티 헤드 어텐션(Multi-Head Attention)을 통해 문장 내 단어들이 서로 어떤 연관성을 가지는지 다각도에서 병렬로 계산할 수 있게 만듦.

5. WMT 2014 영어-독어 번역 작업에서 28.4 BLEU(기계 번역 평가 지표) 점수를 획득하여 당시 세계 최고 수준의 번역 정확도를 달성함.

6. 셀프 어텐션은 수많은 정보가 담긴 책에서 내가 찾아야 할 특정 단어들에 형광펜을 칠해 눈에 띄게 만드는 과정과 유사함.

7. 신경망은 전체 단어 행렬에서 쿼리(Query)와 키(Key)의 유사도를 연산해 값(Value)에 가중치를 곱하는 방식으로 이 형광펜 기능을 컴퓨터로 구현함.

---

## 3. 역사적 흐름과 의의 (Historical Context)

15세기 구텐베르크가 활판 인쇄기를 발명해 성경을 대량 인쇄함으로써 대중의 지식 혁명이 시작된 바 있음.
활자를 빠르게 대량으로 찍어내는 속도의 혁신이 인류의 문명을 완전히 바꾸어 놓은 것임.
Transformer가 순차 연산을 배제하고 문장 전체를 한 번에 병렬 연산하는 구조로 전환한 것은, AI 분야에서 수작업 사본 필사 시대를 끝내고 활판 인쇄 시대로 전환한 역사적 변곡점과 같음.`,
    reviewed_content: `*   **나의 생각**: RNN의 순차적 특성을 배제했기 때문에 단어의 순서 정보를 학습하기 위해 Positional Encoding(위치 인코딩)을 더해준 아이디어가 매우 흥미로움.
*   **비판적 질문**: 긴 문장(Long Context)을 처리할 때 셀프 어텐션의 복잡도가 O(N^2)로 증가하는 문제는 어떻게 개선할 수 있을까?
*   **행동 지침**: 향후 내 프로젝트에서 거대 시퀀스를 다룰 일이 있다면, 순수 Transformer 보다는 최근 나온 롱 콘텍스트 아키텍처(FlashAttention 등)의 적용을 고려해야 함.`,
    original_url: 'https://arxiv.org/abs/1706.03762'
  },
  {
    id: 'paper-2',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: 'He et al.',
    publish_year: 2015,
    source_category: 'Sutskever List',
    abstract: 'We present a residual learning framework to ease the training of networks that are substantially deeper than those previously used.',
    draft_content: `> **컴퓨터의 눈은 인간의 망막처럼 겹겹이 쌓인 신경망층을 통과하며 형상을 구체화함.**
> **하지만 지능의 깊이를 키우기 위해 신경망의 층을 깊게 쌓을수록, 역전파되는 정보가 중간에 증발해 버리는 물리적 난제에 부딪혔음.**
> **본 연구는 경로를 우회하는 지름길을 뚫어줌으로써, 거대한 정보가 심연에 빠지지 않고 온전히 바닥까지 닿게 만들었음.**

---

## 1. 핵심 요약 (Abstract & Summary)

1. 기존 심층 신경망은 레이어가 특정 임계치를 넘어 깊어질수록 성능이 오히려 저하되는 Degredation(열화 현상)을 겪었음.

2. 원인은 가중치가 곱해지는 깊은 회로 속에서 역전파 정보(기울기)가 소실되거나 흩어지기 때문임.

3. 저자들은 기존 입력을 다음 층으로 그대로 전달하는 잔차 연결(Residual Connection, 혹은 Skip Connection)을 도입해 이 정체를 돌파함.

---

## 2. 주요 기여 및 구조 (Key Contribution)

4. 당시 누구도 성공하지 못했던 152층 깊이의 극도로 깊은 합성곱 신경망(CNN) 학습에 성공함.

5. ILSVRC 2015 이미지 분류 대회에서 오차율 3.57%를 기록하며 압도적 1위를 달성함.

6. 잔차 연결은 복잡한 서류 결재선 중간에 누락이 발생하지 않도록, 실무자가 최종 승인자에게 직접 보고서를 팩스로 직송할 수 있는 직통 전화를 개설한 것과 비슷함.

7. 신경망은 단순 레이어 학습 $F(x)$ 대신, 잔차 $F(x) = H(x) - x$를 학습하도록 수식을 변경해 최적화의 난도를 획기적으로 완화함.`,
    reviewed_content: '',
    original_url: 'https://arxiv.org/abs/1512.03385'
  },
  {
    id: 'paper-3',
    title: 'Understanding LSTM Networks',
    authors: 'Christopher Olah',
    publish_year: 2015,
    source_category: 'Sutskever List',
    abstract: 'LSTMs are a very special kind of Recurrent Neural Network, capable of learning long-term dependencies.',
    draft_content: `> **망각은 망가진 기능이 아니라 기억을 유연하게 유지하기 위한 조절 장치임.**
> **기계 역시 과거의 모든 정보에 집착하면 정작 지금 해야 할 판단을 그르치게 됨.**
> **이 교육용 문서는 RNN이 마주한 장기 기억 상실의 한계를 풀고, 기억의 서랍을 여닫는 규칙을 시각적으로 해설했음.**

---

## 1. 핵심 요약 (Abstract & Summary)

1. 기본 RNN은 시퀀스가 길어지면 앞쪽 정보를 끝까지 가져가지 못하는 장기 의존성(Long-term Dependency) 학습 실패를 경험함.

2. LSTM(장단기메모리)은 내부 '셀 상태(Cell State)'를 유지하며 정보를 보존하도록 고안됨.

3. 셀 상태 위에 게이트 구조(망각, 입력, 출력 게이트)를 얹어, 매 순간 어떤 정보를 잊고 보존할지 통제함.`,
    reviewed_content: '',
    original_url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/'
  }
];

const MOCK_RELATIONS: Relation[] = [
  { source: 'paper-3', target: 'paper-1', type: 'inspires' }, // LSTM -> Transformer
  { source: 'paper-2', target: 'paper-1', type: 'cites' }    // ResNet (Skip connection) -> Transformer (Residuals)
];

// Mock Quizzes for Paper 1
const MOCK_QUIZZES = [
  {
    question: 'Transformer 아키텍처가 기존 RNN 모델에 비해 병렬 처리에 유리한 결정적 이유는 무엇인가요?',
    options: [
      '단어를 순차적으로 돌려가며 순환(Recurrence) 연산을 수행하기 때문',
      '순환 단계를 완전히 제거하고 모든 단어 간의 가중치를 한 번에 병렬 연산하기 때문',
      'CNN(합성곱) 필터를 사용하여 로컬 수용 영역을 넓혔기 때문',
      '데이터 크기를 줄이기 위한 손실 압축 알고리즘을 사용하기 때문'
    ],
    correctAnswer: '순환 단계를 완전히 제거하고 모든 단어 간의 가중치를 한 번에 병렬 연산하기 때문',
    explanation: '우리가 살펴본 것처럼, Transformer는 시간 순서대로 데이터를 누적하던 RNN 구조를 버렸음. 대신 문장 전체를 통째로 입력하고 셀프 어텐션 행렬을 사용해 모든 단어가 동시에 다른 단어들과 상호작용하도록 연산함. 이는 GPU의 병렬 하드웨어 성능을 100% 끄집어내는 원동력이 됨.'
  },
  {
    question: '순환 구조를 없앰으로써 발생하는 단어의 위치(순서) 정보 유실 문제는 어떻게 극복했나요?',
    options: [
      '각 단어에 랜덤 가중치를 더해줌',
      '위치 정보를 나타내는 사인/코사인 함수 기반의 위치 인코딩(Positional Encoding)을 임베딩에 더해줌',
      '더 큰 메모리 캐시를 추가하여 극복함',
      '데이터셋에서 임의로 순서를 섞어 해결함'
    ],
    correctAnswer: '위치 정보를 나타내는 사인/코사인 함수 기반의 위치 인코딩(Positional Encoding)을 임베딩에 더해줌',
    explanation: 'Transformer는 순환 단계가 없어 입력 단어가 문장 내 몇 번째에 위치하는지 알 수 없음. 그래서 단어 벡터에 고유한 주파수를 지닌 기하학적 위치 인코딩 벡터를 덧셈 연산하여 신경망이 순서 관계를 파악하도록 학습적 힌트를 줌.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'paper-detail' | 'quiz'>('dashboard');
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [selectedPaper, setSelectedPaper] = useState<Paper>(MOCK_PAPERS[0]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    'paper-1': { status: 'reviewed', isQuizPassed: true, studyDuration: 1800 },
    'paper-2': { status: 'reading', isQuizPassed: false, studyDuration: 450 },
    'paper-3': { status: 'unread', isQuizPassed: false, studyDuration: 0 }
  });
  
  const [studyTime, setStudyTime] = useState<number>(2250); // Total seconds
  const [reviewInput, setReviewInput] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  // Check database configuration on load
  useEffect(() => {
    setDbConnected(isSupabaseConfigured());
  }, []);

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
      // Update active paper study duration
      setUserProgress(prev => {
        const current = prev[selectedPaper.id] || { status: 'unread', isQuizPassed: false, studyDuration: 0 };
        return {
          ...prev,
          [selectedPaper.id]: {
            ...current,
            studyDuration: current.studyDuration + 1
          }
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedPaper.id]);

  useEffect(() => {
    // Sync editor content with selected paper's reviewed content
    setReviewInput(selectedPaper.reviewed_content || '');
    setQuizSubmitted(false);
    setSelectedAnswers({});
  }, [selectedPaper]);

  const selectPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    setUserProgress(prev => {
      const current = prev[paper.id] || { status: 'unread', isQuizPassed: false, studyDuration: 0 };
      if (current.status === 'unread') {
        return {
          ...prev,
          [paper.id]: { ...current, status: 'reading' }
        };
      }
      return prev;
    });
    setActiveTab('paper-detail');
  };

  const handleSaveReview = () => {
    // Update local state
    setPapers(prev => prev.map(p => p.id === selectedPaper.id ? { ...p, reviewed_content: reviewInput } : p));
    setUserProgress(prev => ({
      ...prev,
      [selectedPaper.id]: {
        ...(prev[selectedPaper.id] || { isQuizPassed: false, studyDuration: 0 }),
        status: 'reviewed'
      }
    }));
    alert('개인 검토 노트가 안전하게 저장되었습니다!');
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const allCorrect = MOCK_QUIZZES.every((q, idx) => selectedAnswers[idx] === q.correctAnswer);
    if (allCorrect) {
      setUserProgress(prev => ({
        ...prev,
        [selectedPaper.id]: {
          ...(prev[selectedPaper.id] || { status: 'reading', studyDuration: 0 }),
          isQuizPassed: true
        }
      }));
    }
  };

  // Stats calculation
  const totalReviewed = Object.values(userProgress).filter(p => p.status === 'reviewed').length;
  const progressPercent = Math.round((totalReviewed / papers.length) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BookOpen className="text-[var(--accent-primary)] w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold m-0 leading-none">AI Paper Companion</h1>
            <p className="text-xs text-[var(--text-muted)] m-0 mt-1">Read, Critique and Connect AI Research Papers</p>
          </div>
        </div>

        {/* Database Status indicator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-3 py-1.5 rounded-full">
            {dbConnected ? (
              <>
                <Wifi className="text-[var(--success)] w-3.5 h-3.5" />
                <span className="text-[var(--text-secondary)]">Supabase 연결됨</span>
              </>
            ) : (
              <>
                <WifiOff className="text-[var(--warning)] w-3.5 h-3.5" />
                <span className="text-[var(--text-muted)]">로컬 (Mock 데모 모드)</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[var(--accent-secondary)]" />
              총 공부: {Math.floor(studyTime / 60)}분 {studyTime % 60}초
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[var(--success)]" />
              리뷰: {totalReviewed} / {papers.length}개
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 flex flex-col justify-between">
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`btn justify-start ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Compass className="w-5 h-5" />
              학습 대시보드
            </button>
            <button 
              onClick={() => setActiveTab('paper-detail')}
              className={`btn justify-start ${activeTab === 'paper-detail' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <BookOpen className="w-5 h-5" />
              논문 상세 & 검토
            </button>
            {selectedPaper.id === 'paper-1' && (
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`btn justify-start ${activeTab === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <HelpCircle className="w-5 h-5" />
                복습 퀴즈 풀기
              </button>
            )}
          </nav>

          {/* Active paper card at bottom of sidebar */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-12 p-3">
            <span className="text-xxs text-[var(--accent-secondary)] font-semibold uppercase tracking-wider block mb-1">현재 학습 중</span>
            <h4 className="text-xs font-semibold text-white truncate m-0 mb-1">{selectedPaper.title}</h4>
            <p className="text-[10px] text-[var(--text-muted)] m-0">{selectedPaper.authors} ({selectedPaper.publish_year})</p>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {/* Progress Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel flex flex-col justify-between min-h-36">
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] font-medium m-0">나의 학습 로드맵 진척도</h3>
                    <h2 className="text-3xl font-extrabold mt-2">{progressPercent}%</h2>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2 mt-4 overflow-hidden border border-[var(--border-color)]">
                    <div className="bg-[var(--accent-primary)] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                <div className="glass-panel flex flex-col justify-between min-h-36">
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] font-medium m-0">현재 학습 상태</h3>
                    <div className="flex gap-4 mt-3">
                      <div className="text-center">
                        <span className="text-xl font-bold block text-[var(--text-primary)]">
                          {Object.values(userProgress).filter(p => p.status === 'unread').length}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">미진행</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xl font-bold block text-[var(--warning)]">
                          {Object.values(userProgress).filter(p => p.status === 'reading').length}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">학습 중</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xl font-bold block text-[var(--success)]">
                          {Object.values(userProgress).filter(p => p.status === 'reviewed').length}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">검토 완료</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel flex flex-col justify-between min-h-36">
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] font-medium m-0">개념 연결망 (Relations)</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      각 논문은 고립되지 않고 역사적 인과 관계와 기술 발전에 의해 하나로 엮여 있습니다.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[var(--accent-secondary)] flex items-center gap-1">
                    총 {MOCK_RELATIONS.length}개의 논문 연결고리 확인 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Knowledge Graph Concept Map */}
              <div className="glass-panel">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="text-[var(--accent-secondary)] w-5 h-5" />
                  지식 연결 그래프 (Concept Map)
                </h3>
                
                {/* SVG Visual Concept Map */}
                <div className="w-full h-64 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-12 flex items-center justify-center relative overflow-hidden">
                  <svg className="w-full h-full absolute inset-0">
                    {/* Link lines */}
                    <line x1="200" y1="130" x2="500" y2="130" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="800" y1="130" x2="500" y2="130" stroke="var(--border-color)" strokeWidth="2" />
                    
                    {/* Graph labels */}
                    <path d="M 330 110 L 350 130 L 330 150" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
                  </svg>
                  
                  {/* Nodes as absolute components */}
                  <div 
                    onClick={() => selectPaper(papers[2])}
                    className="absolute left-[10%] top-[35%] bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3 rounded-12 text-center cursor-pointer hover:border-[var(--accent-secondary)] transition-all min-w-44"
                  >
                    <span className="text-[10px] text-[var(--text-muted)] block">Sequence Modeling</span>
                    <span className="text-xs font-semibold text-white">Understanding LSTM</span>
                    <span className="text-[10px] text-[var(--success)] block mt-1">✓ 선행 이론</span>
                  </div>

                  <div 
                    onClick={() => selectPaper(papers[0])}
                    className="absolute left-[40%] top-[35%] bg-[var(--bg-secondary)] border-2 border-[var(--accent-primary)] p-4 rounded-12 text-center cursor-pointer hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all min-w-48"
                  >
                    <span className="text-[10px] text-[var(--accent-primary)] font-bold block uppercase">Hub Node</span>
                    <span className="text-sm font-semibold text-white">Attention Is All You Need</span>
                    <span className="text-[10px] text-[var(--accent-secondary)] block mt-1">학습 완료 (퀴즈 통과)</span>
                  </div>

                  <div 
                    onClick={() => selectPaper(papers[1])}
                    className="absolute right-[10%] top-[35%] bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3 rounded-12 text-center cursor-pointer hover:border-[var(--accent-secondary)] transition-all min-w-44"
                  >
                    <span className="text-[10px] text-[var(--text-muted)] block">Computer Vision</span>
                    <span className="text-xs font-semibold text-white">Deep ResNet</span>
                    <span className="text-[10px] text-[var(--warning)] block mt-1">● 지금 읽는 중</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
                  * 노드를 클릭하면 해당 논문의 요약초안 및 비판적 검토(Critical Review) 에디터로 즉시 이동합니다.
                </p>
              </div>

              {/* Sutskever 30 List Table */}
              <div className="glass-panel">
                <h3 className="text-lg font-semibold mb-4">Ilya Sutskever 리스트 및 로드맵 리스트</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-[var(--text-secondary)]">
                    <thead>
                      <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] text-xs uppercase font-semibold">
                        <th className="pb-3">카테고리</th>
                        <th className="pb-3">논문 제목</th>
                        <th className="pb-3">저자</th>
                        <th className="pb-3">연도</th>
                        <th className="pb-3 text-center">학습 상태</th>
                        <th className="pb-3 text-right">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {papers.map(p => {
                        const progress = userProgress[p.id] || { status: 'unread', isQuizPassed: false };
                        return (
                          <tr key={p.id} className="hover:bg-rgba(34, 37, 51, 0.2) transition-colors">
                            <td className="py-4 text-xs font-mono text-[var(--accent-secondary)]">{p.source_category}</td>
                            <td className="py-4 font-medium text-white">{p.title}</td>
                            <td className="py-4 text-xs">{p.authors}</td>
                            <td className="py-4 text-xs font-mono">{p.publish_year}</td>
                            <td className="py-4 text-center">
                              {progress.status === 'reviewed' && (
                                <span className="bg-emerald-500/10 text-[var(--success)] text-xs px-2.5 py-1 rounded-full border border-emerald-500/20">
                                  리뷰 완료
                                </span>
                              )}
                              {progress.status === 'reading' && (
                                <span className="bg-amber-500/10 text-[var(--warning)] text-xs px-2.5 py-1 rounded-full border border-amber-500/20">
                                  읽는 중
                                </span>
                              )}
                              {progress.status === 'unread' && (
                                <span className="bg-gray-500/10 text-[var(--text-muted)] text-xs px-2.5 py-1 rounded-full border border-gray-500/10">
                                  미진행
                                </span>
                              )}
                            </td>
                            <td className="py-4 text-right">
                              <button 
                                onClick={() => selectPaper(p)}
                                className="btn btn-secondary py-1 px-3 text-xs"
                              >
                                학습 시작
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'paper-detail' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              {/* Paper header */}
              <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-4">
                <div>
                  <span className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
                    {selectedPaper.source_category}
                  </span>
                  <h2 className="text-2xl font-bold mt-1 mb-2">{selectedPaper.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] m-0">
                    저자: {selectedPaper.authors} | 발표연도: {selectedPaper.publish_year}
                  </p>
                </div>
                <a 
                  href={selectedPaper.original_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary text-xs"
                >
                  원문 링크 <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Two Panel Layout: Left Draft Summary, Right Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: LLM Draft */}
                <div className="glass-panel flex flex-col min-h-[500px]">
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2 m-0">
                      <Database className="text-[var(--accent-primary)] w-4 h-4" />
                      LLM 생성 논문 요약 초안 (세이건 + 메르 스타일)
                    </h3>
                    <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
                      Draft Ver 1.0
                    </span>
                  </div>
                  
                  {/* Summary markdown rendering simulator */}
                  <div className="flex-1 text-sm text-[var(--text-secondary)] overflow-y-auto pr-2 max-h-[500px] leading-relaxed">
                    {selectedPaper.draft_content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('>')) {
                        return (
                          <blockquote key={index} className="border-l-4 border-[var(--accent-primary)] bg-[var(--bg-tertiary)] pl-4 py-2 my-4 rounded-r-8 text-white italic">
                            {paragraph.replace(/>\s*/g, '')}
                          </blockquote>
                        );
                      }
                      if (paragraph.startsWith('---')) {
                        return <hr key={index} className="border-t border-[var(--border-color)] my-6" />;
                      }
                      if (paragraph.startsWith('##')) {
                        return <h3 key={index} className="text-base font-bold text-white mt-5 mb-3">{paragraph.replace(/##\s*/g, '')}</h3>;
                      }
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    })}
                  </div>
                </div>

                {/* Right Panel: Critical Review & Personal Notes Editor */}
                <div className="glass-panel flex flex-col justify-between min-h-[500px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2 m-0">
                        <Edit3 className="text-[var(--accent-secondary)] w-4 h-4" />
                        학습자의 비판적 검토 및 개인 메모
                      </h3>
                      <span className="text-xs text-[var(--text-muted)]">Feynman Technique</span>
                    </div>

                    <div className="mb-4 bg-[var(--bg-tertiary)] p-3 rounded-8 border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      <strong>글쓰기 가이드라인</strong>: 
                      LLM의 요약을 비판적으로 검토한 결과와 나만의 비유, 혹은 이 알고리즘의 한계점과 관련 응용 방안을 여기에 자유롭게 기록해 보세요.
                    </div>

                    <textarea
                      value={reviewInput}
                      onChange={(e) => setReviewInput(e.target.value)}
                      placeholder="예시:
* 나의 생각: ...
* 비판적 질문: ...
* 현업/내 프로젝트 적용 아이디어: ...
"
                      className="w-full h-80 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-8 p-4 text-sm text-white focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={handleSaveReview}
                      className="btn btn-primary flex-1 justify-center"
                    >
                      검토 내용 저장 및 리뷰 완료
                    </button>
                    {selectedPaper.id === 'paper-1' && (
                      <button 
                        onClick={() => setActiveTab('quiz')}
                        className="btn btn-secondary justify-center"
                      >
                        퀴즈 풀러 가기 <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && selectedPaper.id === 'paper-1' && (
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              <div className="border-b border-[var(--border-color)] pb-4">
                <span className="text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider">Active Recall</span>
                <h2 className="text-2xl font-bold mt-1">학습 복습 퀴즈</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  단순히 읽는 것만으로는 지식이 장기 기억으로 넘어가지 않습니다. 퀴즈를 풀며 정답을 떠올리는 훈련을 시작하세요.
                </p>
              </div>

              {/* Quiz Cards */}
              <div className="flex flex-col gap-6">
                {MOCK_QUIZZES.map((quiz, quizIdx) => (
                  <div key={quizIdx} className="glass-panel">
                    <h3 className="text-base font-semibold mb-4 text-white">
                      Q{quizIdx + 1}. {quiz.question}
                    </h3>
                    
                    <div className="flex flex-col gap-2">
                      {quiz.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[quizIdx] === opt;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizSubmitted && setSelectedAnswers(prev => ({ ...prev, [quizIdx]: opt }))}
                            className={`btn justify-start text-left text-sm py-3 px-4 ${
                              isSelected 
                                ? 'bg-[var(--accent-primary-hover)] border-2 border-[var(--accent-primary)] text-white' 
                                : 'btn-secondary'
                            }`}
                            disabled={quizSubmitted}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations shown after submit */}
                    {quizSubmitted && (
                      <div className={`mt-4 p-4 rounded-8 border text-sm ${
                        selectedAnswers[quizIdx] === quiz.correctAnswer 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-[var(--success)]' 
                          : 'bg-danger-500/10 border-danger-500/20 text-[var(--danger)]'
                      }`}>
                        <strong>{selectedAnswers[quizIdx] === quiz.correctAnswer ? '✓ 정답입니다' : '✗ 오답입니다'}</strong>
                        <p className="text-xs text-[var(--text-primary)] mt-2 leading-relaxed">
                          {quiz.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="btn btn-secondary"
                >
                  초기화
                </button>
                <button 
                  onClick={handleQuizSubmit}
                  className="btn btn-primary"
                  disabled={Object.keys(selectedAnswers).length < MOCK_QUIZZES.length}
                >
                  답안 제출 및 해설 채점
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
