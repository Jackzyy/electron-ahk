; #NoTrayIcon

; 16进制转RGB
hexToRgb(hex)
{
  red := hex >> 16 
  green:= (hex & 0xFF00) >> 8
  blue:= hex & 0xFF
  return "rgb(" . red . ", " . green . ", " . blue . ")" 
}

; 色容差 diff最低为1
different(color1,color2,diff) {
    _diff := diff < 1 ? 1 : diff
    return color1 = color2 ? false : ((color1 & 255)-(color2 & 255))//_diff Or Different(color1//256,color2//256,_diff)
}

; 辅助取色
F1::
{
    MouseGetPos &MouseX, &MouseY
    Color := PixelGetColor(MouseX, MouseY)
    A_Clipboard :=  MouseX " " MouseY " " Color
    ToolTip "坐标：" MouseX "," MouseY "`n16进制颜色：" Color "`nRGB颜色：" hexToRgb(Color) "`n内容已保存至剪切板！", MouseX, MouseY
    SetTimer () => ToolTip(), -2000
}

; 脚本的热键挂起的切换
#SuspendExempt
F2::Suspend
#SuspendExempt False

; 鼠标侧键循环事件
XButton1::
{
    loop {
        ; START

        rcd := different(0x816862, PixelGetColor(1084, 934), 10)
        if(rcd = 0) {
            Send "{r down}"
            Sleep 60
            Send "{r up}"
            Sleep 5
        }
        
        tcd := different(0xFFE5BA, PixelGetColor(1128, 937), 10)
        if(tcd = 0) {
            Send "{t down}"
            Sleep 20
            Send "{t up}"
            Sleep 5
        }

        Sleep 10
        
        ; ; 1084 934 0x816862
        ; rcd := different(0x816862, PixelGetColor(1084, 934), 10)
        ; if(rcd = 0) {
        ;     Send "{r down}"
        ;     ; Sleep 100
        ;     Send "{r up}"
        ;     ; Sleep 5
        ; }
    
        ; ; 1128 937 0xFFE5BA
        ; tcd := different(0xFFE5BA, PixelGetColor(1128, 937), 10)
        ; if(tcd = 0) {
        ;     Send "{t down}"
        ;     ; Sleep 55
        ;     Send "{t up}"
        ;     ; Sleep 5
        ; }

        ; Sleep 10

        ; END

        ; Send "{r down}"
        ; Sleep 1
        ; Send "{r up}"
        ; Sleep 95
        ; Send "{t down}"
        ; Sleep 35
        ; Send "{t up}"
        ; Sleep 6
        ; Sleep 1
        ; Sleep 25

    } Until Not GetKeyState("XButton1", "P")
}
