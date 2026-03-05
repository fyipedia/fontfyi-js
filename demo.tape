Output demo.gif
Set FontSize 14
Set Width 920
Set Height 580
Set Shell "zsh"
Set Theme "Catppuccin Mocha"
Set TypingSpeed 30ms
Set Padding 20

Type "node"
Enter
Sleep 1s

Type "const { fontInfo, fontCSS, fontPairings } = await import('fontfyi')"
Enter
Sleep 1.5s

Type "fontInfo('Inter')"
Enter
Sleep 2.5s

Type "fontCSS('Fira Code')"
Enter
Sleep 2s

Type "fontPairings('Inter')"
Enter
Sleep 2.5s

Type ".exit"
Enter
Sleep 1s
