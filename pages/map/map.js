var companylist = require("../../datas/data.js")
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    // display: 'ALWAYS',
    display: 'BYCLICK',
    showscale: true,
    scale: 4,
    markers: [],
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
    var that = this
    var marks = []
    for (var item in companylist.data) {
      var data = companylist.data[item];

      var markerItem = {
        longitude: data[3],
        latitude: data[4],
        callout: {
          content: '区域：' + data[0] + '\n' + '名称：' + data[1] + '\n' + '地址：' + data[2],
          padding: 10,
          borderRadius: 5,
          bgColor: '#cccccccc',
          fontSize: 14,
          display: that.data.display
        },
        // lable: {
        //   content: data[0] + ',' + data[1],
        // },
        iconPath: '../../images/location_red.png',
      };
      marks.push(markerItem)

    }
    this.setData({
      markers: marks
    });

    // that.setData({ markers:marks})
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  bindregionchange: function(e) {
    var that = this;
    // if (e.causedBy === 'scale') {
    //   this.mapCtx.getScale({
    //     success: function(e) {
          
    //       if (e.scale > 7) {
    //         console.log(e.scale)
    //         that.setData({
    //           display: 'ALWAYS',
    //           markers: that.data.markers
    //         })
    //       } else {
    //         that.setData({
    //           display: 'BYCLICK'
    //         })

    //       }
    //     }
    //   })
    //   // console.log(e.scale);
    // }
  },

  regionchange: function(e) {


  }
})