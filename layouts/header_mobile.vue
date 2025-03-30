<template>
    <header>
        <nav>
            <ul class="flex space-x-4">
                <li><img :src="Logo" alt="" class="w-12 h-12"></li>
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
            </ul>
        </nav>
    </header>
</template>
<script setup lang="ts">
import Logo from '~/assets/logo/reading.png'
</script>