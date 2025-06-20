export default function convertBr(content: string) {
    const formatContent =
        content !== ""
            ? content.replace(/<br\s*\/?>/gi, "<br>").replaceAll("<br>", "\n")
            : content;

    return formatContent;
}
