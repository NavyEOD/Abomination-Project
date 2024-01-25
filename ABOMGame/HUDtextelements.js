<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @font-face {
            font-family: 'perfectDOS';
            font-style: normal;
            font-weight: 400;
            src: local('Perfect DOS VGA 437'), url('https://fonts.cdnfonts.com/s/7377/Perfect DOS VGA 437.woff') format('woff');
        }
        body { 
            background: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "perfectDOS" !important;
        }
        #dialogue {
            position: absolute;
            user-select: none;
            background-color: black;
            padding: 10px;
            border: 2px solid white;
            outline: 3px dashed white;
        }
    </style>
</head>
<body>
    <div id="display" style="white-space: break-spaces; border: 2px solid white; outline: 3px dashed white; padding: 10px; user-select: none; background-color: rgb(15,15,15);">
        
    </div>

    <div id="dialogue">
        INITIALIZING...<br>
        RUNNING DIAGNOSTICS... RESPONSE OK<br>
        CHECKING WEAPONS... RESPONSE OK<br>
        VERIFYING INTEGRITY OF ARMOR... RESPONSE OK<br>
        ACTIVATING OPTICAL SYSTEMS... RESPONSE OK<br>
        DIAGNOSING SCANNER SYSTEMS... RESPONSE OK<br>
        ACTIVATING MOVEMENT SYSTEMS... RESPONSE OK<br>
        WT-MCH UNIT 01 ONLINE.<br>
        PRESS DIRECTIONAL KEYS TO MOVE.
    </div>
    <script src="geometry.js"></script>
</body>
</html>
