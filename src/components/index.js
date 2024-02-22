import {
    createApp
} from 'vue'

const app = createApp({})

import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'
import Nav from '@/components/common/Nav.vue'

app.component(
    'Footer',
    'Header',
    'Nav'
)