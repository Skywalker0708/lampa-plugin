// test

(function () {
    // Основна функція плагіна
    function UAKinoPlugin() {
        // URL сайту
        const BASE_URL = 'https://uakino.me/';

        // Функція для завантаження HTML та парсингу
        async function fetchContent(url) {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const movies = [];
            doc.querySelectorAll('.movie-item').forEach(item => {
                const title = item.querySelector('.title').textContent.trim();
                const link = BASE_URL + item.querySelector('a').getAttribute('href');
                const poster = item.querySelector('img').getAttribute('src');
                movies.push({ title, link, poster });
            });

            return movies;
        }

        // Додавання джерела контенту
        Lampa.DataLoader.add({
            title: 'Фільми з UAKino',
            onLoad: async function () {
                const url = BASE_URL + 'category/films/';
                const movies = await fetchContent(url);
                return movies.map(movie => ({
                    title: movie.title,
                    poster: movie.poster,
                    url: movie.link
                }));
            }
        });

        // Реєстрація пошуку
        Lampa.Search.add({
            title: 'Пошук на UAKino',
            search: async function (query, callback) {
                const url = `${BASE_URL}search?query=${encodeURIComponent(query)}`;
                const results = await fetchContent(url);
                callback(results.map(movie => ({
                    title: movie.title,
                    poster: movie.poster,
                    url: movie.link
                })));
            }
        });

        // Відтворення відео
        async function playVideo(url) {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const videoUrl = doc.querySelector('video source').getAttribute('src');
            Lampa.Player.play({
                title: 'Відтворення',
                url: videoUrl
            });
        }

        // Додавання відтворення
        Lampa.Player.add({
            title: 'UAKino Player',
            onPlay: async function (params) {
                await playVideo(params.url);
            }
        });
    }

    // Реєструємо плагін
    Lampa.Plugin.register('uakino-plugin', UAKinoPlugin);
})();
