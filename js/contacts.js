document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !telegram || !message) {
        alert("Заполните все поля!");
        return;
    }

    const profileLink = `https://t.me/${telegram.replace("@", "")}`;

    let userIP = "Не удалось получить";
    try {
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
    } catch (error) {
        console.error("Ошибка получения IP:", error);
    }

    const userInfo = {
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceMemory: navigator.deviceMemory || "Неизвестно",
        hardwareConcurrency: navigator.hardwareConcurrency || "Неизвестно",
        connection: navigator.connection ? navigator.connection.effectiveType : "Неизвестно"
    };

    function escapeMarkdownV2(text) {
        return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
    }

    const text = `
📩 *Новое сообщение с сайта!*  
👤 *Имя:* ${escapeMarkdownV2(name)}  
🔑 *Контакт:* ${escapeMarkdownV2(telegram)}  
🎯 *Сообщение:* ${escapeMarkdownV2(message)}  
🔗 *Ссылка:* ${escapeMarkdownV2(profileLink)}  
🌐 *IP\-адрес:* ${escapeMarkdownV2(userIP)}  
💻 *Система:* ${escapeMarkdownV2(navigator.userAgent)}  
🖥️ *Платформа:* ${escapeMarkdownV2(userInfo.platform)}  
🌍 *Язык:* ${escapeMarkdownV2(userInfo.language)}  
📺 *Разрешение экрана:* ${userInfo.screenWidth}x${userInfo.screenHeight}  
📐 *Размер окна:* ${userInfo.innerWidth}x${userInfo.innerHeight}  
🕰️ *Часовой пояс:* ${escapeMarkdownV2(userInfo.timezone)}  
💾 *Память устройства:* ${escapeMarkdownV2(userInfo.deviceMemory.toString())} GB  
⚙️ *Логических процессоров:* ${escapeMarkdownV2(userInfo.hardwareConcurrency.toString())}  
🔌 *Тип подключения:* ${escapeMarkdownV2(userInfo.connection)}  
    `;

    try {
        const response = await fetch("https://234.alonewolf0611.workers.dev/sendMessage", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("response-message").classList.remove("hidden");
            document.getElementById("contact-form").reset();
        } else {
            console.error("Ошибка Telegram API:", result);
            alert(`Ошибка отправки: ${result.error}`);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Ошибка соединения. Проверьте подключение к интернету.");
    }
});
