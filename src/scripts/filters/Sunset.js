Phaser.Filter.Sunset = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = { type: '1f', value: 0.5 };

    this.fragmentSrc = [

        "precision mediump float;",

        "varying vec2       vTextureCoord;",
        "varying vec4       vColor;",
        "uniform sampler2D  uSampler;",
        "uniform float      alpha;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "float r = 0.5126 * gl_FragColor.r;",
            "float g = 0.2152 * gl_FragColor.g;",
            "float b = 0.7722 * gl_FragColor.b;",
            "vec3 color = vec3(r, g, b);",
            "gl_FragColor.rgb = mix(gl_FragColor.rgb, color, alpha);",
        "}"
    ];

};

Phaser.Filter.Sunset.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Sunset.prototype.constructor = Phaser.Filter.Sunset;

/**
* The strength of the alpha. 1 will make the object black and white, 0 will make the object its normal color
* @property alpha
*/
Object.defineProperty(Phaser.Filter.Sunset.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }
});
