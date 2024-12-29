// ==/UserScript==

(function() {
    'use strict';

    // 定义检查单内容
    const checklist = {
        'zh-CN': {
            '准备': ['飞行计划................导入', '高度速度................输入'],
            '推出前': ['停留刹车................提起', '舱门....................关闭'],
            '推出后': ['停留刹车................放下'],
            '滑行\\起飞前': ['两个引擎................开', '襟翼....................起飞位', '安定面配平..............按需', '飞行操纵................检查'],
            '起飞后': ['起落架...................收上', '襟翼....................收上', '自动驾驶................接通'],
            '巡航': ['自动驾驶仪..............检查', 'FMC面板.................检查'],
            '下降': ['FMC面板.................检查'],
            '进近': ['襟翼....................按需放下', '起落架...................放下', '扰流板...................Shift+B预位'],
            '着陆后': ['反推....................关', '襟翼....................收上', '扰流板...................压下'],
            '关车': ['停留刹车................开', '两个引擎................关', '舱门....................开']
        },
        'zh-TW': {
            '準備': ['飛行計劃................導入', '高度速度................輸入'],
            '推出前': ['停留剎車................提起', '艙門....................關閉'],
            '推出後': ['停留剎車................放下'],
            '滑行\\起飛前': ['兩個引擎................開', '襟翼....................起飛位', '安定面配平..............按需', '飛行操縱................檢查'],
            '起飛後': ['起落架...................收起', '襟翼....................收起', '自動駕駛................接通'],
            '巡航': ['自動駕駛儀..............檢查', 'FMC面板.................檢查'],
            '下降': ['FMC面板.................檢查'],
            '進近': ['襟翼....................按需放下', '起落架...................放下', '擾流板...................Shift+B預位'],
            '著陸後': ['反推....................關', '襟翼....................收起', '擾流板...................壓下'],
            '關車': ['停留剎車................開', '兩個引擎................關', '艙門....................開']
        },
        'en': {
            'Preparation': ['Flight Plan..............Import', 'Altitude/Speed..........Input'],
            'Before Pushback': ['Parking Brake...........Set', 'Doors...................Close'],
            'After Pushback': ['Parking Brake...........Release'],
            'Taxi\\Before Takeoff': ['Engines.................Start', 'Flaps...................Takeoff Position', 'Stabilizer Trim..........As Required', 'Flight Controls..........Check'],
            'After Takeoff': ['Landing Gear............Retract', 'Flaps...................Retract', 'Autopilot...............Engage'],
            'Cruise': ['Autopilot...............Check', 'FMC Panel...............Check'],
            'Descent': ['FMC Panel...............Check'],
            'Approach': ['Flaps...................As Required', 'Landing Gear............Extend', 'Spoilers................Shift+B Arm'],
            'After Landing': ['Thrust Reverser.........Disengage', 'Flaps...................Retract', 'Spoilers................Deploy'],
            'Shutdown': ['Parking Brake...........Set', 'Engines.................Shutdown', 'Doors...................Open']
        },
        'ja': {
            '準備': ['フライトプラン............入力', '高度/速度................設定'],
            'プッシュバック前': ['パーキングブレーキ........設定', 'ドア....................閉鎖'],
            'プッシュバック後': ['パーキングブレーキ........解除'],
            'タキシング\\離陸前': ['エンジン.................始動', 'フラップ.................離陸位置', 'スタビライザートリム......調整', '飛行操作................確認'],
            '離陸後': ['着陸装置.................収納', 'フラップ.................収納', 'オートパイロット..........作動'],
            '巡航': ['オートパイロット..........確認', 'FMCパネル................確認'],
            '降下': ['FMCパネル................確認'],
            'アプローチ': ['フラップ.................展開', '着陸装置.................展開', 'スポイラー................Shift+Bでアーム'],
            '着陸後': ['逆推力装置...............解除', 'フラップ.................収納', 'スポイラー................展開'],
            'シャットダウン': ['パーキングブレーキ........設定', 'エンジン.................停止', 'ドア....................開放']
        },
        'fr': {
            'Préparation': ['Plan de vol..............Importer', 'Altitude/Vitesse.........Entrer'],
            'Avant poussée': ['Frein de stationnement...Mettre', 'Portes...................Fermer'],
            'Après poussée': ['Frein de stationnement...Relâcher'],
            'Roulage\\Avant décollage': ['Moteurs.................Démarrer', 'Volet....................Position décollage', 'Trim de stabilisateur.....Ajuster', 'Contrôles de vol..........Vérifier'],
            'Après décollage': ['Train d\'atterrissage.....Rentrer', 'Volet....................Rentrer', 'Pilote automatique........Engager'],
            'Croisière': ['Pilote automatique........Vérifier', 'Panneau FMC..............Vérifier'],
            'Descente': ['Panneau FMC..............Vérifier'],
            'Approche': ['Volet....................Déployer', 'Train d\'atterrissage.....Sortir', 'Spoilers.................Shift+B pour armer'],
            'Après atterrissage': ['Inverseur de poussée.....Désengager', 'Volet....................Rentrer', 'Spoilers.................Déployer'],
            'Arrêt': ['Frein de stationnement...Mettre', 'Moteurs.................Arrêter', 'Portes...................Ouvrir']
        }
    };

    // 标题和作者信息
    const titles = {
        'zh-CN': {
            title: 'GeoFS 飞行检查单',
            author: '由開飛機のzm制作（ZMNB!)',
            opacityLabel: '透明度',
            fontSizeLabel: '字体大小',
            addItemLabel: '添加项目',
            deleteItemLabel: '删除项目'
        },
        'zh-TW': {
            title: 'GeoFS 飛行檢查單',
            author: '由開飛機のzm製作',
            opacityLabel: '透明度',
            fontSizeLabel: '字體大小',
            addItemLabel: '添加項目',
            deleteItemLabel: '刪除項目'
        },
        'en': {
            title: 'GeoFS Flight Inspection Checklist',
            author: 'Created by bilibili-開飛機のzm',
            opacityLabel: 'Opacity',
            fontSizeLabel: 'Font Size',
            addItemLabel: 'Add Item',
            deleteItemLabel: 'Delete Item'
        },
        'ja': {
            title: 'GeoFS フライトチェックリスト',
            author: 'bilibili-開飛機のzm作成',
            opacityLabel: '不透明度',
            fontSizeLabel: 'フォントサイズ',
            addItemLabel: '項目を追加',
            deleteItemLabel: '項目を削除'
        },
        'fr': {
            title: 'GeoFS Liste de contrôle de vol',
            author: 'Créé par bilibili-開飛機のzm',
            opacityLabel: 'Opacité',
            fontSizeLabel: 'Taille de police',
            addItemLabel: 'Ajouter un élément',
            deleteItemLabel: 'Supprimer un élément'
        }
    };

    // 创建菜单
    function createMenu() {
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '10px';
        menu.style.left = '10px';
        menu.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        menu.style.padding = '10px';
        menu.style.borderRadius = '5px';
        menu.style.zIndex = '1000';
        menu.style.fontFamily = 'Arial, sans-serif';
        menu.style.color = '#333';
        menu.style.width = '300px';
        menu.style.height = '500px';
        menu.style.overflowY = 'auto';
        menu.style.userSelect = 'none';

    // 使菜单可拖动
    let isDragging = false;
    let offsetX, offsetY;

    menu.addEventListener('mousedown', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
            isDragging = true;
            offsetX = e.clientX - menu.offsetLeft;
            offsetY = e.clientY - menu.offsetTop;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            menu.style.left = `${e.clientX - offsetX}px`;
            menu.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 标题
    const title = document.createElement('h3');
    title.textContent = titles['en'].title; // 默认英文
    title.style.marginBottom = '5px';
    menu.appendChild(title);

    // 作者信息
    const author = document.createElement('p');
    author.textContent = titles['en'].author; // 默认英文
    author.style.fontSize = '12px';
    author.style.color = '#666';
    author.style.marginBottom = '10px';
    menu.appendChild(author);

    // 语言切换
    const languageSelect = document.createElement('select');
    languageSelect.innerHTML = `
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁體中文</option>
        <option value="ja">日本語</option>
        <option value="fr">Français</option>
    `;
    languageSelect.style.marginBottom = '10px';
    menu.appendChild(languageSelect);

    // 透明度调整
    const opacityLabel = document.createElement('p');
    opacityLabel.textContent = `${titles['en'].opacityLabel}: 100%`; // 默认英文
    opacityLabel.style.fontSize = '12px';
    opacityLabel.style.marginBottom = '5px';
    menu.appendChild(opacityLabel);

    const opacitySlider = document.createElement('input');
    opacitySlider.type = 'range';
    opacitySlider.min = '0';
    opacitySlider.max = '100';
    opacitySlider.value = '100';
    opacitySlider.style.width = '100%';
    opacitySlider.style.marginBottom = '10px';
    opacitySlider.addEventListener('input', () => {
        const opacity = opacitySlider.value / 100;
        menu.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        opacityLabel.textContent = `${titles[languageSelect.value].opacityLabel}: ${opacitySlider.value}%`;
    });
    menu.appendChild(opacitySlider);

    // 字体大小调整
    const fontSizeLabel = document.createElement('p');
    fontSizeLabel.textContent = `${titles['en'].fontSizeLabel}: 14px`; // 默认英文
    fontSizeLabel.style.fontSize = '12px';
    fontSizeLabel.style.marginBottom = '5px';
    menu.appendChild(fontSizeLabel);

    const fontSizeSlider = document.createElement('input');
    fontSizeSlider.type = 'range';
    fontSizeSlider.min = '10';
    fontSizeSlider.max = '20';
    fontSizeSlider.value = '14';
    fontSizeSlider.style.width = '100%';
    fontSizeSlider.style.marginBottom = '10px';
    fontSizeSlider.addEventListener('input', () => {
        menu.style.fontSize = `${fontSizeSlider.value}px`;
        fontSizeLabel.textContent = `${titles[languageSelect.value].fontSizeLabel}: ${fontSizeSlider.value}px`;
    });
    menu.appendChild(fontSizeSlider);

    // 检查单内容
    const checklistContainer = document.createElement('div');
    checklistContainer.style.marginTop = '10px';
    menu.appendChild(checklistContainer);

    // 更新检查单内容
    function updateChecklist(lang) {
        checklistContainer.innerHTML = '';
        for (const [section, items] of Object.entries(checklist[lang])) {
            const sectionTitle = document.createElement('h4');
            sectionTitle.textContent = section;
            sectionTitle.style.marginBottom = '5px';
            checklistContainer.appendChild(sectionTitle);

            const sectionContainer = document.createElement('div');
            sectionContainer.style.marginBottom = '10px';

            items.forEach((item, index) => {
                const itemContainer = document.createElement('div');
                itemContainer.style.display = 'flex';
                itemContainer.style.alignItems = 'center';
                itemContainer.style.marginBottom = '5px';
                itemContainer.draggable = true;

                // 拖动功能
                itemContainer.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', index);
                    itemContainer.style.opacity = '0.4';
                });

                itemContainer.addEventListener('dragend', () => {
                    itemContainer.style.opacity = '1';
                });

                itemContainer.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const dragOverItem = e.target.closest('div[draggable="true"]');
                    if (dragOverItem && dragOverItem !== itemContainer) {
                        const rect = dragOverItem.getBoundingClientRect();
                        const offset = e.clientY - rect.top;
                        if (offset < rect.height / 2) {
                            checklistContainer.insertBefore(itemContainer, dragOverItem);
                        } else {
                            checklistContainer.insertBefore(itemContainer, dragOverItem.nextSibling);
                        }
                    }
                });

                // 打勾功能
                const checkbox = document.createElement('div');
                checkbox.style.width = '20px';
                checkbox.style.height = '20px';
                checkbox.style.border = '2px solid #333';
                checkbox.style.borderRadius = '3px';
                checkbox.style.cursor = 'pointer';
                checkbox.style.flexShrink = '0';
                checkbox.addEventListener('click', () => {
                    checkbox.style.backgroundColor = checkbox.style.backgroundColor === 'blue' ? 'transparent' : 'blue';
                    checkbox.innerHTML = checkbox.style.backgroundColor === 'blue' ? '&#10003;' : '';
                    checkbox.style.color = 'white';
                });
                itemContainer.appendChild(checkbox);

                const itemText = document.createElement('span');
                itemText.textContent = item;
                itemText.style.flexGrow = '1';
                itemText.style.marginLeft = '10px';
                itemContainer.appendChild(itemText);

                // 删除按钮
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '×';
                deleteButton.style.background = 'none';
                deleteButton.style.border = 'none';
                deleteButton.style.color = 'red';
                deleteButton.style.cursor = 'pointer';
                deleteButton.addEventListener('click', () => {
                    itemContainer.remove();
                });
                itemContainer.appendChild(deleteButton);

                sectionContainer.appendChild(itemContainer);
            });

            // 添加项目按钮
            const addItemButton = document.createElement('button');
            addItemButton.textContent = titles[lang].addItemLabel;
            addItemButton.style.marginTop = '10px'; // 修改了这里的样式
            addItemButton.addEventListener('click', () => {
                const newItem = prompt(titles[lang].addItemLabel);
                if (newItem) {
                    const newItemContainer = document.createElement('div');
                    newItemContainer.style.display = 'flex';
                    newItemContainer.style.alignItems = 'center';
                    newItemContainer.style.marginBottom = '5px';
                    newItemContainer.draggable = true;

                    const newCheckbox = document.createElement('div');
                    newCheckbox.style.width = '20px';
                    newCheckbox.style.height = '20px';
                    newCheckbox.style.border = '2px solid #333';
                    newCheckbox.style.borderRadius = '3px';
                    newCheckbox.style.cursor = 'pointer';
                    newCheckbox.style.flexShrink = '0';
                    newCheckbox.addEventListener('click', () => {
                        newCheckbox.style.backgroundColor = newCheckbox.style.backgroundColor === 'blue' ? 'transparent' : 'blue';
                        newCheckbox.innerHTML = newCheckbox.style.backgroundColor === 'blue' ? '&#10003;' : '';
                        newCheckbox.style.color = 'white';
                    });
                    newItemContainer.appendChild(newCheckbox);

                    const newItemText = document.createElement('span');
                    newItemText.textContent = newItem;
                    newItemText.style.flexGrow = '1';
                    newItemText.style.marginLeft = '10px';
                    newItemContainer.appendChild(newItemText);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '×';
                    deleteButton.style.background = 'none';
                    deleteButton.style.border = 'none';
                    deleteButton.style.color = 'red';
                    deleteButton.style.cursor = 'pointer';
                    deleteButton.addEventListener('click', () => {
                        newItemContainer.remove();
                    });
                    newItemContainer.appendChild(deleteButton);

                    // 将新项目容器插入到addItemButton之前
                    sectionContainer.insertBefore(newItemContainer, addItemButton);
                }
            });
            // 将addItemButton移动到事件监听器绑定之后
            sectionContainer.appendChild(addItemButton);

            checklistContainer.appendChild(sectionContainer);
        }

        // 更新标题、作者信息和标签
        title.textContent = titles[lang].title;
        author.textContent = titles[lang].author;
        opacityLabel.textContent = `${titles[lang].opacityLabel}: ${opacitySlider.value}%`;
        fontSizeLabel.textContent = `${titles[lang].fontSizeLabel}: ${fontSizeSlider.value}px`;
    }

    // 初始加载英文
    updateChecklist('en');

    // 语言切换事件
    languageSelect.addEventListener('change', () => {
        updateChecklist(languageSelect.value);
    });

    // 加入QQ群信息
    const joinGroup = document.createElement('p');
    joinGroup.textContent = '加入我们QQ交流群: 797834076';
    joinGroup.style.fontSize = '12px';
    joinGroup.style.color = '#666';
    joinGroup.style.marginTop = '10px';
    menu.appendChild(joinGroup);
    document.body.appendChild(menu);
    return menu;
}

// 监听 Shift+F 打开/关闭菜单
let menu = null;
document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'F') {
        if (menu) {
            menu.remove();
            menu = null;
        } else {
            menu = createMenu();
        }
    }
});
})();


javascript: (() => {!function(e){var o=setInterval(function(){window.geofs&&geofs.aircraft&&geofs.aircraft.instance&&geofs.aircraft.instance.object3d&&(clearInterval(o),function(){window.enabled=void 0,$(document).off("keydown"),$(document).on("keydown",".geofs-stopKeyboardPropagation",function(e){e.stopImmediatePropagation()}),$(document).on("keydown",".address-input",function(e){e.stopImmediatePropagation()}),controls.spoilersArming=!1,controls.setters.spoilersArming={label:"Spoiler Arming",set:function(){enabled&&(geofs.aircraft.instance.groundContact?controls.spoilersArming=!1:controls.spoilersArming=!controls.spoilersArming)}};var e=controls.keyDown;controls.keyDown=function(o){"undefined"!=typeof enabled&&o.which===geofs.preferences.keyboard.keys["Airbrake toggle (on/off)"].keycode?o.shiftKey?(enabled=!0,controls.setters.spoilersArming.set()):(enabled=!1,controls.spoilersArming=!1,controls.setters.setAirbrakes.set()):e(o)},instruments.definitions.spoilersArming={overlay:{url:"https://raw.githubusercontent.com/Guy-Adler/GeoFSSpoilersArming/main/spoilersArm.png",alignment:{x:"right",y:"bottom"},size:{x:100,y:21},position:{x:20,y:195},anchor:{x:100,y:0},rescale:!0,rescalePosition:!0,animations:[{type:"show",value:"spoilersArmed"}]}};var o=instruments.init;instruments.init=function(e){aircraftWithBadlyImplementedSpoilers=["2871","2865","2870","2769","2772"],void 0!==e.spoilers||aircraftWithBadlyImplementedSpoilers.includes(geofs.aircraft.instance.aircraftRecord.id)?(enabled=!0,e.spoilersArming=e.spoilers):enabled=void 0,o(e)},instruments.init(geofs.aircraft.instance.setup.instruments),$(document).on("keydown",controls.keyDown),geofs.api.addFrameCallback(function(){geofs.aircraft.instance.animationValue.spoilersArmed=controls.spoilersArming,controls.spoilersArming&&geofs.aircraft.instance.groundContact&&0===controls.airbrakes.position&&enabled&&(controls.spoilersArming=!1,controls.setters.setAirbrakes.set())},"spoilersArming")}())},100)}();})();

