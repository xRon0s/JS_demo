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

            const targetData = tab.dataset.tab; // "html", "css", "html2", など
            const baseName = targetData.replace('2', '');
            const suffix = targetData.includes('2') ? '2' : '';
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
                const suffix = targetData.match(/\d*$/)[0]; // '2', '3' などを取得
                const baseName = targetData.replace(suffix, '');
                filenameEl.textContent = filenames[baseName] || 'file';
            }
        });
    });
});

// プレビュー用の関数
function showPreviewMessage() {
    const messageCard = document.getElementById('messageCard');
    messageCard.style.display = messageCard.style.display === 'none' ? 'block' : 'none';
}

// 5ページ目用のプレビュー関数を追加
function showPreviewMessage2() {
    const messageCard = document.getElementById('messageCard2');
    messageCard.style.display = messageCard.style.display === 'none' ? 'block' : 'none';
}




















// --- HTML要素の取得 ---
const typingText = document.getElementById('typingText');
const Text = document.getElementById('Text'); // 本文要素を追加

// --- 表示するメッセージ（配列に変更）---
const messages = [
    "welcome to the world of coding!",
    "let's create something amazing together.",
];

// --- アニメーションの状態を管理する変数 ---
let currentMessageIndex = 0; // 現在のメッセージインデックスを追加
let currentCharIndex = 0;
let typingTimeout; // setTimeoutの管理用

/**
 * 1文字ずつタイピングするアニメーションを実行する関数
 */
function typeMessage() {
    // (ここから追加) すべてのメッセージを表示し終えた場合の完了処理
    if (currentMessageIndex >= messages.length) {
        typingText.classList.add('complete'); // カーソルの点滅を止める
        
        // 1秒待ってからテキストをフェードアウトさせる
        setTimeout(() => {
            typingText.style.opacity = '0';
            Text.style.opacity = '1'; // 本文を表示
        }, 1000);
        return; // 関数を終了
    }

    const currentMessage = messages[currentMessageIndex];
    
    // 現在のメッセージを1文字ずつ表示
    if (currentCharIndex < currentMessage.length) {
        typingText.textContent = currentMessage.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        const delay = Math.random() * 100 + 50;
        typingTimeout = setTimeout(typeMessage, delay);
    } else {
        // (ここから追加) 1つのメッセージを最後まで表示し終えた時の処理
        currentMessageIndex++;
        currentCharIndex = 0;
        
        if (currentMessageIndex < messages.length) {
            // 次のメッセージを表示する前に1.5秒待つ
            typingTimeout = setTimeout(() => {
                // typingText.textContent = ''; // テキストをクリア（元のコードにはないが、あると自然）
                typeMessage();
            }, 1500);
        } else {
            // すべてのメッセージが終わったので、完了処理へ移行
            typeMessage();
        }
    }
}

// ページの読み込みが完了したらアニメーションを開始
window.addEventListener('load', () => {
    setTimeout(typeMessage, 500);
});