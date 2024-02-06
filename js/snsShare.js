const nowURL = encodeURI(window.location.href);
console.log(nowURL);

const shareFacebook = () => {
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + nowURL);
};
const shareTwitter = () => {
  const text = "나의 플러팅 타입은?";
  window.open(
    "https://twitter.com/intent/tweet?text=" + text + "&url=" + nowURL
  );
};
