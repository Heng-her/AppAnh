<template>
    <header>
        <nav class="flex justify-between items-center flex-wrap bg-gray-800 text-white items-center w-full">
    <!-- Left Side: Logo, Search Bar, and Icons -->
    <ul class="flex  space-x-2 w-full max-w-xl md:w-full lg:w-full items-center p-4">

        <li><img src="~/assets/logo/reading.png" alt="App Anh" title="App Anh" class="w-12 h-12"></li>
        <li class="w-full">
            <input type="search" placeholder="Search value"
                class="w-full max-w-sm h-10 p-3 rounded-2xl focus:outline-none">
        </li>
        <li><img src="~/assets/icon/add_new.png" alt="tile with one click" class="w-10 h-8"></li>
        <li><img src="~/assets/icon/bookmark.png" alt="Favorite" class="w-10 h-8"></li>
    </ul>

    <!-- Right Side: Login & Register -->
    <ul class="flex justify-start items-center ml-2 mr-2 p-2 w-full max-w-xl md:w-full lg:w-full space-x-4 bg-blue-500 rounded-2xl">
        <li><a href="/">Login</a></li>
        <li><a href="/">Register</a></li>
    </ul>
</nav>
</header>
</template>