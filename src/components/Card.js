import React from 'react'

export default function Card() {
  return (
    <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src='https://images.unsplash.com/photo-1528830984461-4d5c3cc1abf0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="card-img-top" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              this si some important text
            </p>
            <div className="container w-100">
                <select className="m-2 h-100  bg-success rounded">
                    {Array.from(Array(6),(e,i)=>{
                        return(
                            <option key={i+1} value={i+1}>
                                {i+1}
                            </option>
                        )
                    })}
                </select>

                <select className="m-2 h-100  bg-success rounded">
                    <option value="half">Half</option>
                    <option value="full">Full</option>

                </select>
                <div className="d-inline w-100">
                    Total Price
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
