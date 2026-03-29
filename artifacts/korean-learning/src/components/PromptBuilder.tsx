import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const appTypes = ['웹사이트', 'AI 챗봇', '업무 자동화', '데이터 분석', '기타'];
const audiences = ['개인 사용', '소규모 팀', '기업/조직', '일반 대중'];
const features = ['사용자 인증', '데이터베이스', '결제 시스템', 'AI 연동', 'API 연동', '대시보드'];
const techStacks = ['Next.js + Supabase', 'React + Express', 'Python + FastAPI', 'Flutter', '기타'];

export default function PromptBuilder() {
  const dreamProject = useAppStore((s) => s.dreamProject);

  const [selectedApp, setSelectedApp] = useState(appTypes[0]);
  const [selectedAudience, setSelectedAudience] = useState(audiences[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState(techStacks[0]);
  const [copied, setCopied] = useState(false);

  const toggleFeature = (f: string) => {
    setSelectedFeatures((p) =>
      p.includes(f) ? p.filter((x) => x !== f) : [...p, f]
    );
  };

  const prompt = `나는 ${dreamProject || '새로운 프로젝트'}를 만들려고 해.

유형: ${selectedApp}
대상: ${selectedAudience}
필요 기능: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : '미정'}
기술 스택: ${selectedStack}

Plan Mode로 먼저 전체 구조를 설계해줘.
설계가 완료되면 단계별로 구현하고,
각 단계마다 테스트를 포함해줘.`;

  const copyPrompt = () => {
    try {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 시
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D6] p-6">
      <h2 className="text-lg font-bold text-[#1A1714] mb-1">
        나만의 시작 프롬프트 만들기
      </h2>
      <p className="text-sm text-[#9D9087] mb-5">
        아래 옵션을 선택하면 클로드에 바로 붙여넣을 수 있는 프롬프트가 만들어져요.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#6B6560] mb-1.5">앱 유형</label>
          <div className="flex flex-wrap gap-2">
            {appTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedApp(t)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedApp === t
                    ? 'bg-[#D97757] text-white'
                    : 'bg-[#F5F0EB] text-[#6B6560] hover:bg-[#E8E0D6]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6B6560] mb-1.5">대상</label>
          <div className="flex flex-wrap gap-2">
            {audiences.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAudience(a)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedAudience === a
                    ? 'bg-[#D97757] text-white'
                    : 'bg-[#F5F0EB] text-[#6B6560] hover:bg-[#E8E0D6]'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6B6560] mb-1.5">필요 기능</label>
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedFeatures.includes(f)
                    ? 'bg-[#2D7D52] text-white'
                    : 'bg-[#F5F0EB] text-[#6B6560] hover:bg-[#E8E0D6]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6B6560] mb-1.5">기술 스택</label>
          <div className="flex flex-wrap gap-2">
            {techStacks.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStack(s)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedStack === s
                    ? 'bg-[#D97757] text-white'
                    : 'bg-[#F5F0EB] text-[#6B6560] hover:bg-[#E8E0D6]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 생성된 프롬프트 */}
      <div className="relative">
        <pre className="code-block p-4 rounded-xl text-sm whitespace-pre-wrap leading-relaxed">
          {prompt}
        </pre>
        <button
          onClick={copyPrompt}
          className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md bg-[#D97757] text-white hover:bg-[#B85C35] transition-colors"
        >
          {copied ? '복사됨' : '프롬프트 복사'}
        </button>
      </div>

      <p className="mt-3 text-xs text-[#9D9087]">
        복사한 프롬프트를 Claude Code 대화창에 붙여넣고 실행해보세요!
      </p>
    </div>
  );
}
