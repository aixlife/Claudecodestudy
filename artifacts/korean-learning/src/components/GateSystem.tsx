import { useState } from 'react';
import type { Gate } from '../data/types';

interface GateSystemProps {
  gate: Gate;
  moduleId: string;
  isCompleted: boolean;
  savedResponse?: string;
  onComplete: () => void;
  onSaveResponse: (moduleId: string, response: string) => void;
}

// 확인형 게이트: "이해했나요? [네, 다음으로]"
function GateConfirm({ onComplete, isCompleted, gate }: {
  onComplete: () => void;
  isCompleted: boolean;
  gate: Gate;
}) {
  return (
    <div className="mt-8 p-6 bg-[#F5F0EB] rounded-xl border border-[#E8E0D6]">
      <p className="text-lg font-medium text-[#1A1714] mb-5">{gate.prompt}</p>
      {isCompleted ? (
        <div className="flex items-center gap-2 text-[#2D7D52] text-base">
          <span>✓</span>
          <span className="font-medium">완료!</span>
        </div>
      ) : (
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-[#D97757] text-white rounded-lg text-base font-medium hover:bg-[#B85C35] transition-colors"
        >
          네, 다음으로
        </button>
      )}
    </div>
  );
}

// 입력형 게이트: 텍스트 입력 → 입력 후 다음 활성화
function GateInput({ gate, moduleId, onComplete, onSaveResponse, isCompleted, savedResponse }: {
  gate: Gate;
  moduleId: string;
  onComplete: () => void;
  onSaveResponse: (moduleId: string, response: string) => void;
  isCompleted: boolean;
  savedResponse?: string;
}) {
  const [text, setText] = useState(savedResponse || '');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onSaveResponse(moduleId, text.trim());
    onComplete();
  };

  return (
    <div className="mt-8 p-6 bg-[#F5F0EB] rounded-xl border border-[#E8E0D6]">
      <p className="text-lg font-medium text-[#1A1714] mb-4">{gate.prompt}</p>
      {isCompleted ? (
        <div className="p-4 bg-white rounded-lg border border-[#E8E0D6]">
          <p className="text-sm text-[#6B6560]">내 답변:</p>
          <p className="text-base text-[#1A1714] font-medium mt-1">{savedResponse || text}</p>
          <div className="flex items-center gap-2 text-[#2D7D52] mt-3">
            <span>✓</span>
            <span className="font-medium">완료!</span>
          </div>
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={gate.placeholder || '여기에 입력하세요...'}
            className="w-full p-4 bg-white border border-[#E8E0D6] rounded-lg text-base text-[#1A1714] placeholder:text-[#9D9087] focus:outline-none focus:border-[#D97757] resize-none"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={text.trim().length === 0}
            className="mt-4 px-8 py-3 bg-[#D97757] text-white rounded-lg text-base font-medium hover:bg-[#B85C35] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음으로
          </button>
        </>
      )}
    </div>
  );
}

// 실행형 게이트: 체크박스 확인 → 실행 완료 후 다음
function GateExecute({ gate, onComplete, isCompleted }: {
  gate: Gate;
  onComplete: () => void;
  isCompleted: boolean;
}) {
  const [checks, setChecks] = useState<boolean[]>(
    new Array(gate.checkItems?.length || 0).fill(false)
  );

  const allChecked = checks.every(Boolean);

  const toggleCheck = (idx: number) => {
    const next = [...checks];
    next[idx] = !next[idx];
    setChecks(next);
  };

  return (
    <div className="mt-8 p-6 bg-[#F5F0EB] rounded-xl border border-[#E8E0D6]">
      <p className="text-lg font-medium text-[#1A1714] mb-5">{gate.prompt}</p>
      {isCompleted ? (
        <div className="space-y-3">
          {gate.checkItems?.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[#2D7D52]">
              <span>✓</span>
              <span className="text-base">{item}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-[#2D7D52] mt-4">
            <span>✓</span>
            <span className="text-base font-medium">모두 완료!</span>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-5">
            {gate.checkItems?.map((item, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    checks[i]
                      ? 'bg-[#2D7D52] border-[#2D7D52]'
                      : 'border-[#9D9087] group-hover:border-[#D97757]'
                  }`}
                  onClick={() => toggleCheck(i)}
                >
                  {checks[i] && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-base ${checks[i] ? 'text-[#2D7D52] line-through' : 'text-[#1A1714]'}`}
                  onClick={() => toggleCheck(i)}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
          <button
            onClick={onComplete}
            disabled={!allChecked}
            className="px-8 py-3 bg-[#D97757] text-white rounded-lg text-base font-medium hover:bg-[#B85C35] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allChecked ? '완료! 다음으로' : '위 항목을 모두 체크해주세요'}
          </button>
        </>
      )}
    </div>
  );
}

// 통합 게이트 렌더러
export default function GateSystem({ gate, moduleId, isCompleted, savedResponse, onComplete, onSaveResponse }: GateSystemProps) {
  switch (gate.type) {
    case 'confirm':
      return <GateConfirm gate={gate} onComplete={onComplete} isCompleted={isCompleted} />;
    case 'input':
      return (
        <GateInput
          gate={gate}
          moduleId={moduleId}
          onComplete={onComplete}
          onSaveResponse={onSaveResponse}
          isCompleted={isCompleted}
          savedResponse={savedResponse}
        />
      );
    case 'execute':
      return <GateExecute gate={gate} onComplete={onComplete} isCompleted={isCompleted} />;
    default:
      return null;
  }
}
