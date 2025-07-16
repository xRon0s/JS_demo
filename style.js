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
            
            if (currentPage < 4){
                movingImage2.style.opacity = "0";
            }else if (currentPage < 5) {
                // 4ページ目から5ページ目への移動
                const progress2 = currentPage - 4; // 基準を4に変更
                const leftPosition2 = 50 + (-25 * progress2);
                movingImage2.style.left = leftPosition2 + '%';
                movingImage2.style.top = '50%';
                movingImage2.style.opacity = '1';
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 6) {
                // 5ページ目から6ページ目への移動 (x位置そのまま)
                movingImage2.style.left = '25%';
                movingImage2.style.top = '50%';
                movingImage2.style.opacity = '1';
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 7) {
                // 6ページ目で上に消える
                const progress2 = currentPage - 6; // 基準を6に変更
                const topPosition2 = 50 - (100 * progress2);
                movingImage2.style.left = '25%';
                movingImage2.style.top = topPosition2 + '%';
                movingImage2.style.opacity = 1 - progress2;
                movingImage2.style.transform = 'translate(-50%, -50%)';
            } else if (currentPage < 8){
                movingImage2.style.opacity = '0';
            }
        });


// コード表示
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.code-content');
const filename = document.getElementById('filename');

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
    
    // 整形したHTMLで要素の内容を更新
    contentElement.innerHTML = dedentedHtml.trim();
}

// すべてのコードコンテンツに対してインデント整形を実行
contents.forEach(content => {
    // pre > code の中身を対象にする場合
    const codeBlock = content.querySelector('pre > code');
    if (codeBlock) {
        dedent(codeBlock);
    } else { // pre > code がない場合は content 自体を対象
        dedent(content);
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // アクティブなタブを削除
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // 新しいタブをアクティブに
        tab.classList.add('active');
        const targetTab = tab.getAttribute('data-tab');
        document.getElementById(targetTab + '-content').classList.add('active');
        
        // ファイル名を更新
        filename.textContent = filenames[targetTab];
    });
});

// プレビュー用の関数
function showPreviewMessage() {
    const messageCard = document.getElementById('messageCard');
    messageCard.style.display = messageCard.style.display === 'none' ? 'block' : 'none';
}