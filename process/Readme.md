# 地图前处理

本仓库的文件结构：

```
docs/
    _static/
        <JS 文件> D3, Metro
        <CSS 文件>
    data/
        <CSV 数据文件> 
    <HTML 网页文件>
    ...
process/
    Readme.md  # 本文件
    <XLSX 文件：Metro Stations 地铁站点>
    <其他绘图文件：DWG/DXF/SVG/PDF 等>
    ...

csv-to-join.py   # 地铁站点 CSV 转 JSON 文件 
...    
```

## 如何处理 DWG

若要输出全图的 SVG：

1. 使用 AutoCAD 打开 DWG 文件，并将其转存为 DXF (2018) 文件。
2. 从 Windows 微软商店下载 DXF to SVG Converter, 将上述 DXF 转为 SVG。注意输出的 Model 文件即为主文件。

在 D3 加载 CSV/JSON 绘制 SVG 这一工作流程中，需要注意的点：

1. 记录站点坐标前，请将 DWG 全图以**人民广场站**的中心点为基点，移动到原点（0，0）处。这样大部分站点的坐标就是整数了。
2. 在将 XLSX 保存为 CSV 时，注意需要保证中文的正常编码。请使用 Excel 另存为中的 **UTF-8 CSV** 格式（即带 BOM 的 UTF-8 格式）。

## 经尝试、认为是失败的处理方法

一种直截、但不可行的思路是：

将 PDF 地铁图文件使用 [dawbarton/pdf2svg](https://github.com/dawbarton/pdf2svg) 软件转换为 SVG 文件。可惜这样产生的 SVG 文件由于把样式写入了每一个绘图元素（而不是用CSS的方式写在最前），导致 SVG 文件会非常巨大。
