// GlowScript iframe → 부모 페이지 단축키 패스스루
// Ctrl/Cmd 키를 누르면 부모 페이지로 포커스를 이동하여
// Ctrl+C, Ctrl+F, Ctrl+A 등 브라우저 단축키가 정상 작동하도록 함
(function() {
  document.addEventListener('keydown', function(e) {
    // Ctrl / Cmd / Escape → 부모 페이지로 포커스 이동
    if (e.key === 'Control' || e.key === 'Meta' || e.key === 'Escape') {
      try { window.parent.focus(); } catch(ex) {}
    }
  }, true); // capture phase: GlowScript보다 먼저 실행
})();
