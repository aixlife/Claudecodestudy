export default function Footer() {
  return (
    <div className="w-full py-6 flex flex-col items-center justify-center text-sm gap-1 bg-transparent">
      <a 
        href="https://aixlife.co.kr" 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-medium hover:underline transition-all"
        style={{ color: '#D97757' }}
      >
        aixlife.co.kr
      </a>
      <span style={{ color: '#9D9087' }}>made by aixlife</span>
    </div>
  );
}
