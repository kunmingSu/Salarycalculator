class Header extends React.Component{
    render(){
        return (
            <header>
                工资计算器
            </header>
        )
    }
}

class Content extends React.Component{
    constructor(){
        super()
        this.state={
            status:false,
            num1:0,
            num2:0,
            num3:0,
            yanglao:0,
            yiliao:0,
            shiye:0,
            gongjijin:0,
            jishui:0,
            shui:0,
            shifa:0,
            total:0
        }
        this.calc=this.calc.bind(this)
        this.numChange1=this.numChange1.bind(this)
        this.numChange2=this.numChange2.bind(this)
        this.numChange3=this.numChange3.bind(this)
    }
    calc(ev){
        ev.preventDefault()
        var all=this.state.num1*1+this.state.num2*1+this.state.num3*1
        if(all < 2000){
            alert('您是贫农,免税!!!!')
        }
        var jishu=this.state.num1
        var yanglao=jishu*0.08
        var yiliao=jishu*0.02
        var shiye=jishu*0.005
        var gongjijin=jishu*0.08
        var tongchou=20
        var jishui=all-yanglao-yiliao-shiye-gongjijin-tongchou
        var shuiji=jishui-3500
        var shui=0
        if(shuiji<0){
            shui=0
        }
        if (shuiji <= 1500) {
                shui = shuiji * 0.03
            } else if (shuiji <= 4500) {
                shui = shuiji * 0.1 - 105
            } else if (shuiji <= 9000) {
                shui = shuiji * 0.2 - 555;
            } else {
                shui = shuiji * 0.25 - 1005;
            }
         this.setState({status:true,total:all,yanglao:yanglao,yiliao:yiliao,shiye:shiye,gongjijin:gongjijin,jishui:jishui,shui:shui,shifa:jishui-Math.abs(shui)})
    }
    numChange1(ev){
        this.setState({status:false,num1:ev.target.value})
    }
    numChange2(ev){
        this.setState({status:false,num2:ev.target.value})
    }
    numChange3(ev){
        this.setState({status:false,num3:ev.target.value})
    }
    render(){
        return (
            <div id='neirong'>
            <main>
                <form onSubmit={this.calc}>
                    <input type="text" onInput={this.numChange1} placeholder="请输入您的基本工资/社保基数"/>
                    <input type="text" onInput={this.numChange2} placeholder="请输入您的绩效工资"/>
                    <input type="text" onInput={this.numChange3} placeholder="请输入您的奖金"/>
                    <button>开始计算</button>
                </form>
            </main>
            <div id="content" className={this.state.status}>
                <div className="all total">工资总额 <span>{this.state.total}</span></div>
                <div className="hr"></div>
                <div className="list">养老 8% <span>{this.state.yanglao}</span></div>
                <div className="list">医疗 2% <span>{this.state.yiliao}</span></div>
                <div className="list">失业 0.5% <span>{this.state.shiye}</span></div>
                <div className="list">工伤 0% <span>0</span></div>
                <div className="list">生育 0% <span>0</span></div>
                <div className="list">公积金 8% <span>{this.state.gongjijin}</span></div>
                <div className="list">社保统筹 <span>20</span></div>
                <div className="hr"></div>
                <div className="all">计税工资 <span>{this.state.jishui}</span></div>
                <div className="all">个人所得税 <span>{this.state.shui}</span></div>
                <div className="hr"></div>
                <div className="all total">实发工资 <span>{this.state.shifa}</span></div>
            </div>
            </div>
        )
    }
}

class App extends React.Component{
    render(){
        return (
            <div id='container'>
                <Header />
                <Content stat={this.props.status} />
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)