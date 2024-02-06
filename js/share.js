const url = "https://fairytale-fluttingtype.netlify.app/";
function setShare() {
  var resultImg = document.querySelector("#resultImg");
  var resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = "플러팅 타입 테스트 결과";
  const shareDesc = infoList[resultAlt].name;
  const shareImage = url + "img/image-" + resultAlt + ".png"; // 왜 이렇게 되는거지? 아마 화면에 내보내는건 index.html이니까?
  const shareURL = url + "page/result-" + resultAlt + ".html";

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    buttons: [
      {
        title: "결과 확인하기",
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
  });
}
