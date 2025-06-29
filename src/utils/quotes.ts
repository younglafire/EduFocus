export const inspirationalQuotes = [
  "Học hôm nay – Thành công ngày mai.",
  "Kiến thức là sức mạnh, học tập là chìa khóa.",
  "Mỗi ngày học một điều mới, mỗi ngày tiến bộ hơn.",
  "Thành công không phải là đích đến, mà là hành trình học hỏi.",
  "Đầu tư vào giáo dục luôn mang lại lợi nhuận tốt nhất.",
  "Học không có giới hạn tuổi tác, chỉ có giới hạn ý chí.",
  "Kiên trì học tập là bí quyết để vượt qua mọi thử thách.",
  "Tri thức là kho báu duy nhất không ai có thể cướp đi.",
  "Học tập là đầu tư tốt nhất cho tương lai của bạn.",
  "Mỗi cuốn sách bạn đọc là một bước tiến trên con đường thành công."
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[randomIndex];
};