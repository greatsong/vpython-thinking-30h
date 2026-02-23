// EduFlow: MkDocs 헤더 제목 클릭 시 홈으로 이동
document.addEventListener('DOMContentLoaded', function() {
  var title = document.querySelector('.md-header__title');
  if (title) {
    title.style.cursor = 'pointer';
    title.addEventListener('click', function() {
      var base = document.querySelector('link[rel="canonical"]');
      if (base) {
        window.location.href = base.href.replace(/[^/]*$/, '');
      } else {
        window.location.href = './';
      }
    });
  }
});
