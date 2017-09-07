/**
 * @file 写文件名字
 * @author fanty@jingoal.com
 *
 * 写文件功能
 */
import React, { PureComponent } from 'react';
import SortExample from "../components/Sort/example";

export default class ProductBox extends PureComponent{
   render () {
       return (
           <div className="product-box-container">
               <SortExample />
           </div>
       )
   }
};
