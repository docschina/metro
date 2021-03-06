---
id: caching
title: 缓存
---

Metro 具有多层缓存：你可以设置多缓存以供 Metro 使用。这样做有几个优点，在本页我们将解释缓存如何工作。

## 为什么要缓存?

缓存可以带来很大的性能优势，它们可以将构建工具的速度提高十倍以上。但是，许多系统使用的是非持久性缓存。例如，我们可以将缓存存储在服务器上。因此，连接同一服务器的所有构建工具都可以使用共享缓存。因此，CI 服务器和本地开发的初始构建时间显著降低。

我们希望将缓存存储在多个位置，以便始终拥有可以版本回退的缓存。这就是为什么会出现多层缓存系统。

## 缓存的提前与保存

有一种排序机制来确定要使用的缓存。为了检索缓存，我们从上到下遍历查找，直到我们要找到结果为止；为了保存缓存，我们也这样做，直到找到具有缓存的存储空间。

假设你有两个缓存存储区：一个在服务器上，一个在本地文件系统中。你可以用这种方式指定：

```js
const config = {
  cacheStores: [
    new FileStore({/*opts*/}),
    new NetworkStore({/*opts*/})
  ]
}
```

当我们检索缓存时，Metro 将首先查看 `FileStore`。如果在里面没有找到缓存，它将检查 `NetworkStore`，以此类推。最终，如果也没有找到的话，它将会自己生成一个新的缓存。一旦生成缓存，Metro 将从上到下再次缓存存储在_全部_存储数据中。如果找到缓存，可能也会发生这种情况。例如，如果在 Metro 在 `NetworkStore` 中找到一个缓存，它也会存储在 `FileStore` 中。
