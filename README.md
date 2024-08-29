# alpine-dragdrop

AlpineJS Plugin for easily adding drag and drop capabilities

## Install

### With a CDN

```html
<script defer src="https://unpkg.com/alpine-dragdrop@latest/dist/dragdrop.min.js"></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
yarn add -D alpine-dragdrop

npm install -D alpine-dragdrop
```

```js
import Alpine from 'alpinejs'
import dragdrop from 'alpine-dragdrop'

Alpine.plugin(dragdrop)

Alpine.start()
```

## Example

Examples of how the plugin works.

### Basic Example

```html
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div x-data class="bg-white flex dark:text-white p-6 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div class="w-full">
            <!-- Drag List -->
            <ul
                x-drag:list.preventSelf
                x-bind:class="$list.isDragging ? 'bg-red-500' : 'bg-blue-500'"
                >
                <li x-drag:list-item>Drag Item 1</li>
                <li x-drag:list-item>Drag Item 2</li>
                <li x-drag:list-item>Drag Item 3</li>
            </ul>
        </div>
        <div class="w-full">
            <ul
                class="list list-disc list-inside"
                x-drop:target
                x-bind:class="$droparea.isEntered ? 'bg-green-500' : 'bg-blue-500'">
                Drop List
                <li>
                    one
                </li>
                <li>
                    two
                </li>
            </ul>
        </div>
    </div>
</div>
```
Add the `x-drag:list` directive to the list you want to drag from and the `x-drop:target` directive to the list you want to drop into.

Each List Item will have a unique ID generated for it.
If you want to update the unique ID of the item being dragged, you can add the value to `x-drag:list-item` directive.

```html
<!-- Drag List -->
<ul
    x-drag:list.preventSelf
    x-bind:class="$list.isDragging ? 'bg-red-500' : 'bg-blue-500'"
    >
    <li x-drag:list-item="1">Drag Item 1</li>
    <li x-drag:list-item="2">Drag Item 2</li>
    <li x-drag:list-item="3">Drag Item 3</li>
</ul>
```

You can override the default behavior of the drop method by adding a custom method to the `x-drop:target` directive.

```html
<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div x-data="{
        handle(item, target, data) {
            // item: The item being dragged
            // target: The target list
            // data: The data of the item being dragged
        }
    }" class="bg-white flex dark:text-white p-6 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div class="w-full">
            <!-- Drag List -->
            <ul
                x-drag:list.preventSelf
                x-bind:class="$list.isDragging ? 'bg-red-500' : 'bg-blue-500'"
                >
                <li x-drag:list-item>Drag Item 1</li>
                <li x-drag:list-item>Drag Item 2</li>
                <li x-drag:list-item>Drag Item 3</li>
            </ul>
        </div>
        <div class="w-full">
            <ul
                class="list list-disc list-inside"
                x-drop:target="handle"
                x-bind:class="$droparea.isEntered ? 'bg-green-500' : 'bg-blue-500'">
                Drop List
                <li>
                    one
                </li>
                <li>
                    two
                </li>
            </ul>
        </div>
    </div>
</div>
```

You can check if a list item is being dragged by checking the `$list.isDragging` property.

You can check if a drop area is being entered by checking the `$droparea.isEntered` property.



## Stats

![](https://img.shields.io/bundlephobia/min/alpine-dragdrop)
![](https://img.shields.io/npm/v/alpine-dragdrop)
![](https://img.shields.io/npm/dt/alpine-dragdrop)
![](https://img.shields.io/github/license/markmead/alpine-dragdrop)
