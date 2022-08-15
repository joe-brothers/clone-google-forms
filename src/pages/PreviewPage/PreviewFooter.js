export const PreviewFooter = () => {
  return (
    <article style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#70757a", fontSize: 12 }}>
      <p style={{ alignSelf: "flex-start" }}>
        Ahra Forms를 통해 비밀번호를 제출해도 됩니다. 서버와 연결되지 않았기 때문입니다.
      </p>
      <p>이 콘텐츠는 Ahra가 만들고 승인했습니다.</p>
      <a
        href="https://choar816.github.io/intro-choar/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#70757a", fontSize: 20 }}
      >
        Ahra 설문지
      </a>
    </article>
  );
};
