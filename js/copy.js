const copyButton = document.getElementById;
const copyURL = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("URL이 복사되었습니다.");
};
