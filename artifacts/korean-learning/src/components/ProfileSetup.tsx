import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { UserLevel } from '../data/types';
import Footer from './Footer';

const levels: { id: UserLevel; label: string; description: string }[] = [
  {
    id: 'beginner',
    label: '초보',
    description: '코딩은 처음이에요',
  },
  {
    id: 'intermediate',
    label: '중수',
    description: '조금 해봤어요',
  },
  {
    id: 'advanced',
    label: '고수',
    description: '나가주세요',
  },
];

export default function ProfileSetup() {
  const { setProfile, goToScreen } = useAppStore();
  const [nickname, setNickname] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<UserLevel | null>(null);

  const canProceed = nickname.trim().length >= 2 && selectedLevel !== null;

  const handleStart = () => {
    if (!canProceed || !selectedLevel) return;
    setProfile(nickname.trim(), selectedLevel);
    goToScreen('track-selection');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* 헤더 */}
      <div className="w-full border-b border-[#E8E0D6] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[600px] mx-auto px-6 py-4">
          <button
            onClick={() => goToScreen('onboarding')}
            className="text-sm text-[#9D9087] hover:text-[#D97757] transition-colors"
          >
            &larr; 뒤로
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-[560px] w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1714] mb-3">
            시작하기 전에
          </h1>
          <p className="text-lg text-[#6B6560] mb-10">
            닉네임과 레벨을 선택하면 학습이 시작됩니다.
          </p>

          {/* 닉네임 */}
          <div className="mb-10">
            <label className="block text-base font-semibold text-[#1A1714] mb-3">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="2글자 이상"
              maxLength={20}
              className="w-full px-5 py-4 bg-white border border-[#E8E0D6] rounded-xl text-lg text-[#1A1714] placeholder:text-[#9D9087] focus:outline-none focus:border-[#D97757] transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />
          </div>

          {/* 레벨 선택 */}
          <div className="mb-10">
            <label className="block text-base font-semibold text-[#1A1714] mb-4">
              코딩 경험
            </label>
            <div className="space-y-3">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-all duration-150 ${
                    selectedLevel === lvl.id
                      ? 'border-[#D97757] bg-[#FCEEE7]'
                      : 'border-[#E8E0D6] bg-white hover:border-[#D97757]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-[#1A1714]">{lvl.label}</span>
                      <span className="text-base text-[#9D9087] ml-4">{lvl.description}</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedLevel === lvl.id
                          ? 'border-[#D97757] bg-[#D97757]'
                          : 'border-[#E8E0D6]'
                      }`}
                    >
                      {selectedLevel === lvl.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={handleStart}
            disabled={!canProceed}
            className="w-full py-4 rounded-xl text-lg font-semibold text-white transition-all duration-150"
            style={{
              background: canProceed ? '#D97757' : '#D4C9BB',
              cursor: canProceed ? 'pointer' : 'not-allowed',
              boxShadow: canProceed ? '0 4px 12px rgba(217,119,87,0.3)' : 'none',
            }}
          >
            트랙 선택하러 가기
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
