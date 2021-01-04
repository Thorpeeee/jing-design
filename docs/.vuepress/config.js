module.exports = {
    title: 'Jing Design',
    description: '标题',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.png' }],
    ],
    themeConfig: {
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        logo: '/img/logo.png',
        search: false,

        displayAllHeaders: true,
        nav:[
            {
                text: '导航一',
                link: '/getStart/',
            },
            {
                text: '导航二',
                link: '/page-a/',
            },
            {
                text: '链接',
                items: [
                    {
                        text: '链接1',
                        link: 'https://www.baidu.com'
                    },
                    {
                        text: '链接2',
                        link: 'https://www.hao123.com'
                    },
                ],
            },
        ],
        sidebar: [
            ['/', '首页'],
            ['/getStart/', '指南'],
            {
                title: '组件',
                path: '/components/',
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    {
                        title: '1',
                        path: '/components/1/',
                    },
                    {
                        title: '2',
                        path: '/components/2/',
                    },
                    {
                        title: '3',
                        path: '/components/3/',
                    },
                    {
                        title: '4',
                        path: '/components/4/',
                    },
                    {
                        title: '5',
                        path: '/components/5/',
                    },
                ]
            },
        ],
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': '../'
            }
        }
    },
}
