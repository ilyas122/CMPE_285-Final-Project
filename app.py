import time
from datetime import datetime, timedelta
from flask import Flask, render_template, url_for, request
import json
import matplotlib
import matplotlib.pyplot as plt
import seaborn
import yfinance as yf
import numpy as np
app = Flask(__name__)
matplotlib.use('Agg')

line_chart_dates = []
line_chart_portfolios = []

@app.route('/')
@app.route('/home')
def home():
    return render_template("index_new.html")


def one_investment_strategy(data, amount, strategy):
    all_stock_portfolio = []
    current_value_of_investment = 0
    amount_to_invest = int(amount)
    necessary_info = []
    for stock_item in data[strategy]:
        info = []
        stock_portfolio = []
        money_invested = (int(stock_item['percentage'])/100)*amount_to_invest
        print("Money invested in", stock_item['name'], "is", money_invested)
        stockdata = yf.Ticker(stock_item['symbol'])
        stock=round(stockdata.history(period='2d'), 2)
        if strategy == 'Index Investing':
            current_price = stock['Close'][1]
        else:    
            current_price = stock['Close'][0]
        print("Current value of", stock_item['name'], "is", current_price)
        info.append(stock_item['name'])
        info.append(money_invested)
        info.append(current_price)
        necessary_info.append(info)
        stock = yf.Ticker(stock_item['symbol'])
        hist = stock.history(period="5d")
        number_of_shares = money_invested/current_price
        for price in hist['Close']:
            stock_portfolio.append(price*number_of_shares)
        all_stock_portfolio.append(stock_portfolio)
        current_value_of_investment += (current_price*number_of_shares)

    print(all_stock_portfolio)
    total_portfolio = []
    for index in range(len(all_stock_portfolio[0])):
        s = 0
        s = s + all_stock_portfolio[0][index] + all_stock_portfolio[1][index] + \
            all_stock_portfolio[2][index] + all_stock_portfolio[3][index]
        total_portfolio.append(s)
    
    print(total_portfolio)
    current_time = datetime.now()
    current_day = current_time.strftime('%m-%d-%Y')
    d = str(current_day)
    d1 = datetime.strptime(d, '%m-%d-%Y')
    dates = [(d1-timedelta(days=i)).strftime('%m-%d-%Y')
             for i in range(5, 0, -1)]
    print(dates)
    print(total_portfolio)
    print(current_value_of_investment)
    plt.clf()
    plt.plot(dates, total_portfolio)
    plt.xlabel("Last 5 days")
    plt.ylabel("Amount in USD")
    plt.title("Overall Portfolio Trend")
    plt.savefig('static/images/investment-strategy.jpeg')
    pie_one_investment = np.array([])
    pie_labels = []
    for stock_item in data[strategy]:
        pie_one_investment = np.append(pie_one_investment, int(stock_item['percentage']))
        pie_labels.append(stock_item['name'])
    plt.clf()
    plt.title("Distribution of money towards each stock")
    plt.pie(pie_one_investment, labels = pie_labels)
    plt.savefig('static/images/pie_chart-investment-strategy.jpeg')
    #new_line
    line_chart_dates.extend(dates)
    line_chart_portfolios.extend(total_portfolio)
    #new_line
    return necessary_info

def two_investment_strategy(data, amount, strategy1, strategy2):
    all_stock_portfolio = []
    current_value_of_investment = 0
    amount_to_invest = int(int(amount)/2)
    necessary_info = []
    for stock_item in data[strategy1]:
        info = []
        stock_portfolio = []
        money_invested = (int(stock_item['percentage'])/100)*amount_to_invest
        print("Money invested in", stock_item['name'], "is", money_invested)
        stockdata = yf.Ticker(stock_item['symbol'])
        stock=round(stockdata.history(period='2d'), 2)
        if strategy1 == 'Index Investing':
            current_price = stock['Close'][1]
        else:    
            current_price = stock['Close'][0]
        print("Current value of", stock_item['name'], "is", current_price)
        info.append(stock_item['name'])
        info.append(money_invested)
        info.append(current_price)
        necessary_info.append(info)
        stock = yf.Ticker(stock_item['symbol'])
        hist = stock.history(period="5d")
        number_of_shares = money_invested/current_price
        for price in hist['Close']:
            stock_portfolio.append(price*number_of_shares)
        all_stock_portfolio.append(stock_portfolio)
        current_value_of_investment += (current_price*number_of_shares)
    for stock_item in data[strategy2]:
        info = []
        stock_portfolio = []
        money_invested = (int(stock_item['percentage'])/100)*amount_to_invest
        print("Money invested in", stock_item['name'], "is", money_invested)
        stockdata = yf.Ticker(stock_item['symbol'])
        stock=round(stockdata.history(period='2d'), 2)
        if strategy2 == 'Index Investing':
            current_price = stock['Close'][1]
        else:    
            current_price = stock['Close'][0]
        print("Current value of", stock_item['name'], "is", current_price)
        info.append(stock_item['name'])
        info.append(money_invested)
        info.append(current_price)
        necessary_info.append(info)
        stock = yf.Ticker(stock_item['symbol'])
        hist = stock.history(period="5d")
        number_of_shares = money_invested/current_price
        for price in hist['Close']:
            stock_portfolio.append(price*number_of_shares)
        all_stock_portfolio.append(stock_portfolio)
        current_value_of_investment += (current_price*number_of_shares)

    print(all_stock_portfolio)
    total_portfolio = []
    for index in range(len(all_stock_portfolio[0])):
        s = 0
        s = s + all_stock_portfolio[0][index] + all_stock_portfolio[1][index] + \
            all_stock_portfolio[2][index] + all_stock_portfolio[3][index] + all_stock_portfolio[4][index] + all_stock_portfolio[5][index] + all_stock_portfolio[6][index] + all_stock_portfolio[7][index]
        total_portfolio.append(s)
    print(total_portfolio)
    current_time = datetime.now()
    current_day = current_time.strftime('%m-%d-%Y')
    d = str(current_day)
    d1 = datetime.strptime(d, '%m-%d-%Y')
    dates = [(d1-timedelta(days=i)).strftime('%m-%d-%Y')
             for i in range(5, 0, -1)]
    print(dates)
    print(total_portfolio)
    print(current_value_of_investment)
    plt.clf()
    plt.plot(dates, total_portfolio)
    plt.xlabel("Last 5 days")
    plt.ylabel("Amount in USD")
    plt.title("Overall Portfolio Trend")
    plt.savefig('static/images/two_investment-strategy.jpeg')
    pie_two_investment = np.array([])
    pie_labels = []
    for stock_item in data[strategy1]:
        pie_two_investment = np.append(pie_two_investment, int(stock_item['percentage'])/2)
        pie_labels.append(stock_item['name'])
    for stock_item in data[strategy2]:
        pie_two_investment = np.append(pie_two_investment, int(stock_item['percentage'])/2)
        pie_labels.append(stock_item['name'])
    plt.clf()
    plt.title("Distribution of money towards each stock")
    plt.pie(pie_two_investment, labels = pie_labels)
    plt.savefig('static/images/pie_chart-two-investment-strategy.jpeg')
    # new_line
    line_chart_dates.extend(dates)
    line_chart_portfolios.extend(total_portfolio)
    # new_line
    return necessary_info


@app.route('/result', methods=['POST', 'GET'])
def result():
    output = request.form.to_dict()
    print(output)
    name = output["name"]
    strategy = output["strategy"]
    with open('investing_strategies.json') as f:
        data = json.load(f)
    print(data)
    l = strategy.split()
    
    if len(strategy.split()) == 2:
        info = one_investment_strategy(data, name, strategy)
        stock1 = info[0][0]
        stock2 = info[1][0]
        stock3 = info[2][0]
        stock4 = info[3][0]
        stock1_price = info[0][2]
        stock2_price = info[1][2]
        stock3_price = info[2][2]
        stock4_price = info[3][2]
        stock1_money = info[0][1]
        stock2_money= info[1][1]
        stock3_money = info[2][1]
        stock4_money = info[3][1]
        return render_template('one_strategy.html', name=name, strategy=strategy, stock1 = stock1, stock2 = stock2, stock3 = stock3, stock4 = stock4, stock1_price = stock1_price, stock2_price = stock2_price, stock3_price = stock3_price, stock4_price = stock4_price, stock1_money = stock1_money, stock2_money = stock2_money, stock3_money = stock3_money, stock4_money = stock4_money, url='static/images/investment-strategy.jpeg', url_pie = 'static/images/pie_chart-investment-strategy.jpeg', line_chart_dates = line_chart_dates, line_chart_portfolios = line_chart_portfolios)
    else:
        amount = int(name)
        strategy1_list = l[0:2]
        strategy2_list = l[3:]
        strategy1 = ' '.join(strategy1_list)
        strategy2 = ' '.join(strategy2_list)
        info = two_investment_strategy(data, amount, strategy1, strategy2)
        stock1 = info[0][0]
        stock2 = info[1][0]
        stock3 = info[2][0]
        stock4 = info[3][0]
        stock1_price = info[0][2]
        stock2_price = info[1][2]
        stock3_price = info[2][2]
        stock4_price = info[3][2]
        stock1_money = info[0][1]
        stock2_money= info[1][1]
        stock3_money = info[2][1]
        stock4_money = info[3][1]
        stock5 = info[4][0]
        stock6 = info[5][0]
        stock7 = info[6][0]
        stock8 = info[7][0]
        stock5_price = info[4][2]
        stock6_price = info[5][2]
        stock7_price = info[6][2]
        stock8_price = info[7][2]
        stock5_money = info[4][1]
        stock6_money= info[5][1]
        stock7_money = info[6][1]
        stock8_money = info[7][1]
        return render_template('two_strategies.html', name=name, strategy=strategy1, strategy2 = strategy, stock1 = stock1, stock2 = stock2, stock3 = stock3, stock4 = stock4, stock5 = stock5, stock6 = stock6, stock7 = stock7, stock8 = stock8, stock1_price = stock1_price, stock2_price = stock2_price, stock3_price = stock3_price, stock4_price = stock4_price, stock5_price = stock5_price, stock6_price = stock6_price, stock7_price = stock7_price, stock8_price = stock8_price, stock1_money = stock1_money, stock2_money = stock2_money, stock3_money = stock3_money, stock4_money = stock4_money, stock5_money = stock5_money, stock6_money = stock6_money, stock7_money = stock7_money, stock8_money = stock8_money,url='static/images/two_investment-strategy.jpeg', url_pie = 'static/images/pie_chart-two-investment-strategy.jpeg', line_chart_dates = line_chart_dates, line_chart_portfolios = line_chart_portfolios)


if __name__ == "__main__":
    app.run(debug=True)
