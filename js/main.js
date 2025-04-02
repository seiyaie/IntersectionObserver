/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
    // ビューポート要素を取得
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    // 条件に基づいて適用するビューポートの設定を決定
    const viewportContent = window.outerWidth > 380 ? "width=device-width, initial-scale=1" : "width=380";

    // ビューポート要素が存在しない場合はreturn
    if (!viewportMeta) return;

    // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
    if (viewportMeta.getAttribute("content") !== viewportContent) {
        viewportMeta.setAttribute("content", viewportContent);
    }
};
switchViewport();
window.addEventListener("resize", switchViewport);

const initializedIntersectionObserver = () => {
    const kv = document.querySelector(".js-kv"); //監視対象
    const header = document.querySelector(".js-header");

    // Opening Keyframe
    const openingKeyframes = {
        transform: ["translateY(-100%)", "translateY(0)"],
    };

    // Closing Keyframe
    const closingKeyframes = {
        transform: ["translateY(0)", "translateY(-100%)"],
    };

    // 共通Option
    const animationOptions = {
        duration: 300,
        easing: "linear",
    };

    // kvまたは、headerが存在しない場合は処理を終了
    if (!kv || !header) return;

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            // kv がvp内に入り、かつheaderがfixedを保有している場合
            if (entry.isIntersecting && header.classList.contains("fixed")) {
                //header閉じるアニメーション開始
                const closeAnimation = header.animate(closingKeyframes, animationOptions);
                //アニメーション終了後にfixed削除
                closeAnimation.onfinish = () => {
                    header.classList.remove("fixed");
                };
                //kvがvp外に出た場合
            } else if (!entry.isIntersecting) {
                //headerを固定表示するためにfixed追加
                header.classList.add("fixed");
                //ヘッダー表示アニメーション開始
                header.animate(openingKeyframes, animationOptions);
            }
        });
    };

    const options = {
        threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    //監視対象を監視
    observer.observe(kv);
};

initializedIntersectionObserver();
