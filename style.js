function disableScroll() {
    document.body.style.overflow = 'hidden';
}
function enableScroll() {
    document.body.style.overflow = '';
}


disableScroll();

setTimeout(() => {
    const doors = document.querySelectorAll('.door');
    doors.forEach(door => {
        door.classList.toggle('opened');
    });
    disableScroll();
}, 1000);

setTimeout(() => {
    enableScroll();
}, 3000);

setTimeout(() => {
    const imgBox = document.getElementById('imgBox');
    if (imgBox){
        imgBox.classList.toggle('visible');
    }

    const doorContainer = document.querySelector('.door-container');
    if (doorContainer) {
        doorContainer.style.display = 'none';
    }
}, 2200);

setTimeout(() => {
    const op_text = document.getElementById('op_text');
    if (op_text) {
        op_text.classList.toggle('visible');
    }
},3200);

const container = document.getElementById('cont');
const movingImage = document.getElementById('movingImage');
const pageNumber = document.getElementById('pageNumber');
const movingText = document.getElementById('moving-text');
const movingSubtitle = document.getElementById('moving-subtitle');

        container.addEventListener('scroll', () => {
            const scrollTop = container.scrollTop;
            const windowHeight = window.innerHeight;
            const currentPage = scrollTop / windowHeight;
            
            if (currentPage < 1){
                movingImage.style.opacity = "0";
            }else if (currentPage < 2) {
                // 1ページ目から2ページ目への移動
                const progress = currentPage -1;
                const leftPosition = 50 + (25 * progress);
                movingImage.style.left = leftPosition + '%';
                movingImage.style.top = '50%';
                movingImage.style.opacity = '1';
                movingImage.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 3) {
                // 3ページ目で上に消える
                const progress = currentPage - 2;
                const topPosition = 50 - (100 * progress);
                movingImage.style.left = '75%';
                movingImage.style.top = topPosition + '%';
                movingImage.style.opacity = 1 - progress;
                movingImage.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 5){
                movingImage.style.opacity = '0';
            }
        });


const movingImage2 = document.getElementById('movingImage2');
const pageNumber2 = document.getElementById('pageNumber2');
const movingText2 = document.getElementById('moving-text2');
const movingSubtitle2 = document.getElementById('moving-subtitle2');

        container.addEventListener('scroll', () => {
            const scrollTop = container.scrollTop;
            const windowHeight = window.innerHeight;
            const currentPage = scrollTop / windowHeight;
            
            if (currentPage < 6){
                movingImage2.style.opacity = "0";
            }else if (currentPage < 7) {
                // 4ページ目から5ページ目への移動
                const progress2 = currentPage - 6; // 基準を4に変更
                const leftPosition2 = 50 + (-25 * progress2);
                movingImage2.style.left = leftPosition2 + '%';
                movingImage2.style.top = '50%';
                movingImage2.style.opacity = '1';
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 8) {
                // 5ページ目から6ページ目への移動 (x位置そのまま)
                movingImage2.style.left = '25%';
                movingImage2.style.top = '50%';
                movingImage2.style.opacity = '1';
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 9) {
                // 6ページ目で上に消える
                const progress2 = currentPage - 8; // 基準を6に変更
                const topPosition2 = 50 - (100 * progress2);
                movingImage2.style.left = '25%';
                movingImage2.style.top = topPosition2 + '%';
                movingImage2.style.opacity = 1 - progress2;
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 10){
                movingImage2.style.opacity = '0';
            }
        });


// コード表示
document.addEventListener('DOMContentLoaded', () => {
    const filenames = {
        html: 'index.html',
        css: 'style.css',
        js: 'script.js',
        preview: 'Preview'
    };

    // すべてのタブボタンにイベントリスナーを設定
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', () => {
            const codeSection = tab.closest('.code-section');
            if (!codeSection) return;

            const targetData = tab.dataset.tab; // "html", "css2", "js3" など

            // 'html3' のような文字列から 'html' と '3' を分離する
            const match = targetData.match(/^([a-z]+)(\d*)$/);
            if (!match) return; // マッチしない場合は何もしない

            const baseName = match[1]; // "html", "css", "js"
            const suffix = match[2];   // "", "2", "3"
            const targetContentId = `${baseName}-content${suffix}`;

            // 1. 同じセクション内のタブのアクティブ状態をリセット
            codeSection.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. 同じセクション内のコンテンツの表示を切り替え
            codeSection.querySelectorAll('.code-content').forEach(content => {
                if (content.id === targetContentId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // 3. ファイル名を更新
            const filenameEl = codeSection.querySelector('.code-filename');
            if (filenameEl) {
                filenameEl.textContent = filenames[baseName] || 'file';
            }
        });
    });

    // インデント整形
    document.querySelectorAll('.code-content').forEach(content => {
        dedent(content);
    });
});


/**
 * コードブロックのインデントを整形する関数
 * @param {HTMLElement} contentElement - コードコンテンツの要素
 */
function dedent(contentElement) {
    const text = contentElement.textContent; // インデント計算用にテキストのみ取得
    const lines = text.split('\n');

    // 空の行を無視して、最小のインデントを見つける
    const minIndent = lines.reduce((min, line) => {
        if (line.trim() === '') return min;
        const match = line.match(/^\s*/);
        const indent = match ? match[0].length : 0;
        return Math.min(min, indent);
    }, Infinity);

    // 最小インデントが有限でない場合（コードが空など）は何もしない
    if (!isFinite(minIndent) || minIndent === 0) return;

    // HTMLを維持したままインデントを削除
    const html = contentElement.innerHTML;
    const dedentedHtml = html
        .split('\n')
        .map(line => line.substring(minIndent))
        .join('\n');
    
    // 整形したHTMLで要素を更新
    contentElement.innerHTML = dedentedHtml;
}






